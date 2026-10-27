// Servicio de aplicación para ingesta
// Worker que normaliza correos -> crea/actualiza reservas
import { EmailPort } from '../ports/email.port';
import { ProviderPort } from '../ports/provider.port';
import { EmailMockAdapter } from '../adapters/out/email-mock.adapter';
import { ProviderMockAdapter } from '../adapters/out/provider-mock.adapter';
import { Reservation, ReservationSource, ReservationType, ReservationStatus } from '../../../../../../packages/domain/entities';
import { eventBus } from '../../../shared/events/eventBus';
import { DomainEventType } from '../../../shared/events/types';
import { randomUUID } from 'crypto';

export class IngestionService {
  private emailAdapter: EmailPort = new EmailMockAdapter();
  private providerAdapter: ProviderPort = new ProviderMockAdapter();
  private reservations: Reservation[] = []; // Almacenamiento en memoria para el prototipo

  // Simula procesamiento de correos (RF-03, RF-07)
  async processEmails(userId: string): Promise<Reservation[]> {
    const emails = await this.emailAdapter.fetchEmails(userId);
    const created: Reservation[] = [];

    for (const email of emails) {
      // Normalización simple (ACL)
      const reservation = this.normalizeFromEmail(email);
      // Idempotencia: chequear por bookingRef + provider
      const exists = this.reservations.find(r => r.bookingRef === reservation.bookingRef && r.provider === reservation.provider);
      if (!exists) {
        this.reservations.push(reservation);
        created.push(reservation);
        eventBus.publish(DomainEventType.RESERVATION_INGESTED, { reservation });
      }
    }
    return created;
  }

  // Simula polling de proveedores (RF-04)
  async pollProviders(): Promise<any[]> {
    const updates = await this.providerAdapter.pollUpdates();
    const results = [];
    for (const update of updates) {
      // Buscar reserva por bookingRef
      const reservation = this.reservations.find(r => r.bookingRef === update.bookingRef);
      if (reservation) {
        reservation.rawData = { ...reservation.rawData, providerUpdate: update.update };
        eventBus.publish(DomainEventType.RESERVATION_UPDATED, { reservation, update });
        results.push({ updated: reservation.bookingRef, update: update.update });
      }
    }
    return results;
  }

  private normalizeFromEmail(email: any): Reservation {
    // Extracción simple del bookingRef
    const bookingRefMatch = email.subject.match(/([A-Z0-9-]+)/);
    const bookingRef = bookingRefMatch ? bookingRefMatch[1] : randomUUID();
    
    // Determinar tipo
    let type = ReservationType.OTHER;
    if (email.subject.toLowerCase().includes('vuelo')) type = ReservationType.FLIGHT;
    if (email.subject.toLowerCase().includes('hotel')) type = ReservationType.HOTEL;
    
    return {
      id: randomUUID(),
      tripId: '', // Se asignará después al agrupar por viaje
      userId: email.userId,
      type,
      provider: email.from,
      bookingRef,
      status: ReservationStatus.CONFIRMED,
      startAt: new Date('2026-11-01'),
      endAt: new Date('2026-11-05'),
      rawData: { email },
      source: ReservationSource.EMAIL,
    };
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }
}

export const ingestionService = new IngestionService();
