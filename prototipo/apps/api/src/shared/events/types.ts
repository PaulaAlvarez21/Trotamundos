// Tipos de eventos de dominio (contrato compartido)
// Se mantienen simples para trazabilidad con las secuencias del ADD
export enum DomainEventType {
  TRIP_CREATED = 'trip.created',
  TRIP_COMPLETED = 'trip.completed',
  TRIP_ARCHIVED = 'trip.archived',
  RESERVATION_CREATED = 'reservation.created',
  RESERVATION_INGESTED = 'reservation.ingested',
  RESERVATION_UPDATED = 'reservation.updated',
  SHARE_CREATED = 'share.created',
  HANDOFF_CREATED = 'handoff.created',
}

export interface DomainEvent<T = any> {
  id: string;
  type: DomainEventType;
  payload: T;
  occurredAt: Date;
}
