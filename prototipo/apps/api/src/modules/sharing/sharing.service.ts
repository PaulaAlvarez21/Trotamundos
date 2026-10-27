// Servicio de compartición controlada (RF-10)
import { ItineraryShare } from '../../../../../packages/domain/entities';
import { tripsService } from '../trips-reservations/trips.service';
import { eventBus } from '../../shared/events/eventBus';
import { DomainEventType } from '../../shared/events/types';
import { randomUUID } from 'crypto';

export class SharingService {
  private shares: ItineraryShare[] = [];

  createShare(tripId: string, ownerId: string, expiresInHours: number = 24): ItineraryShare {
    const share: ItineraryShare = {
      id: randomUUID(),
      tripId,
      ownerId,
      token: randomUUID(),
      expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
    };
    this.shares.push(share);
    eventBus.publish(DomainEventType.SHARE_CREATED, { share });
    return share;
  }

  getSharedTrip(token: string) {
    const share = this.shares.find(s => s.token === token);
    if (!share) return null;
    if (share.expiresAt < new Date()) return null; // Expirado
    return tripsService.getTripById(share.tripId);
  }

  getShareByToken(token: string) {
    return this.shares.find(s => s.token === token);
  }
}

export const sharingService = new SharingService();
