// Servicio de analítica (RF-09) - registro mínimo de eventos
import { DomainEventLog } from '../../../../../packages/domain/entities';
import { eventBus } from '../../shared/events/eventBus';
import { DomainEventType } from '../../shared/events/types';
import { randomUUID } from 'crypto';

export class AnalyticsService {
  private events: DomainEventLog[] = [];

  constructor() {
    // Capturar todos los eventos de dominio
    Object.values(DomainEventType).forEach(type => {
      eventBus.subscribe(type as DomainEventType, (event) => {
        this.events.push({
          id: randomUUID(),
          type: event.type,
          payload: event.payload,
          occurredAt: event.occurredAt,
        });
      });
    });
  }

  getRecentEvents(limit: number = 20) {
    return this.events.slice(-limit).reverse();
  }

  getStats() {
    const stats: any = {};
    for (const event of this.events) {
      stats[event.type] = (stats[event.type] || 0) + 1;
    }
    return stats;
  }
}

export const analyticsService = new AnalyticsService();
