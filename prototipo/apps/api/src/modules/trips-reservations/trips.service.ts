// Servicio para viajes y reservas (núcleo)
import { Trip, Reservation, TripStatus, ReservationSource, ReservationType, ReservationStatus } from '../../../../../packages/domain/entities';
import { eventBus } from '../../shared/events/eventBus';
import { DomainEventType } from '../../shared/events/types';
import { randomUUID } from 'crypto';
import { ingestionService } from '../ingestion/application/ingestion.service';

export class TripsService {
  private trips: Trip[] = [];
  private reservations: Reservation[] = [];

  constructor() {
    // Escuchar eventos de ingesta
    eventBus.subscribe(DomainEventType.RESERVATION_INGESTED, (event) => {
      const { reservation } = event.payload;
      this.reservations.push(reservation);
      this.groupIntoTrip(reservation);
    });
  }

  // Agrupar reservas en viajes (RF-01)
  private groupIntoTrip(reservation: Reservation) {
    // Buscar viaje activo para el mismo usuario
    let trip = this.trips.find(t => t.userId === reservation.userId && t.status === TripStatus.ACTIVE);
    if (!trip) {
      trip = {
        id: randomUUID(),
        userId: reservation.userId,
        title: 'Viaje',
        startDate: reservation.startAt,
        endDate: reservation.endAt,
        status: TripStatus.ACTIVE,
      };
      this.trips.push(trip);
      eventBus.publish(DomainEventType.TRIP_CREATED, { trip });
    }
    reservation.tripId = trip.id;
  }

  // CRUD manual (RF-02)
  createManualReservation(userId: string, data: any): Reservation {
    const reservation: Reservation = {
      id: randomUUID(),
      tripId: '',
      userId,
      type: data.type || ReservationType.OTHER,
      provider: data.provider || 'Manual',
      bookingRef: data.bookingRef || randomUUID(),
      status: ReservationStatus.CONFIRMED,
      startAt: new Date(data.startAt),
      endAt: new Date(data.endAt),
      rawData: data,
      source: ReservationSource.MANUAL,
    };
    this.reservations.push(reservation);
    this.groupIntoTrip(reservation);
    eventBus.publish(DomainEventType.RESERVATION_CREATED, { reservation });
    return reservation;
  }

  getTripsWithReservations(userId: string) {
    const userTrips = this.trips.filter(t => t.userId === userId && t.status !== TripStatus.ARCHIVED);
    return userTrips.map(trip => ({
      trip,
      reservations: this.reservations.filter(r => r.tripId === trip.id),
    }));
  }

  // Ciclo de vida - archivar viajes completados (RF-05)
  checkAndArchiveCompletedTrips() {
    const now = new Date();
    for (const trip of this.trips) {
      if (trip.status === TripStatus.ACTIVE && trip.endDate < now) {
        trip.status = TripStatus.COMPLETED;
        eventBus.publish(DomainEventType.TRIP_COMPLETED, { trip });
        // Archivar después de completado
        setTimeout(() => {
          trip.status = TripStatus.ARCHIVED;
          eventBus.publish(DomainEventType.TRIP_ARCHIVED, { trip });
        }, 1000);
      }
    }
  }

  getTripById(tripId: string) {
    const trip = this.trips.find(t => t.id === tripId);
    if (!trip) return null;
    return {
      trip,
      reservations: this.reservations.filter(r => r.tripId === tripId),
    };
  }
}

export const tripsService = new TripsService();
