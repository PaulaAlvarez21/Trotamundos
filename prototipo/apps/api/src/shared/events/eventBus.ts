// EventBus simple usando EventEmitter (in-memory)
// Simula un bus asíncrono según MADR-0004
import { EventEmitter } from 'events';
import { DomainEvent, DomainEventType } from './types';
import { randomUUID } from 'crypto';

class EventBus extends EventEmitter {
  publish<T>(type: DomainEventType, payload: T): DomainEvent<T> {
    const event: DomainEvent<T> = {
      id: randomUUID(),
      type,
      payload,
      occurredAt: new Date(),
    };
    // Emitir de forma async para simular desacoplamiento
    setImmediate(() => this.emit(type, event));
    return event;
  }

  subscribe<T>(type: DomainEventType, handler: (event: DomainEvent<T>) => void) {
    this.on(type, handler);
  }
}

export const eventBus = new EventBus();
