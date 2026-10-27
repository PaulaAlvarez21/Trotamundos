// Mock de agencia de viajes para handoff (RF-08)
import { eventBus } from '../../shared/events/eventBus';
import { DomainEventType } from '../../shared/events/types';
import { randomUUID } from 'crypto';

export class AgencyMockService {
  private cases: any[] = [];

  async createCase(data: any) {
    const caseId = `CASE-${randomUUID().substring(0, 8)}`;
    const caso = {
      id: caseId,
      status: 'OPEN',
      createdAt: new Date(),
      ...data,
    };
    this.cases.push(caso);
    eventBus.publish(DomainEventType.HANDOFF_CREATED, { case: caso });
    return { caseId, status: 'OPEN', message: 'Caso creado en agencia de viajes preferida' };
  }

  getCase(caseId: string) {
    return this.cases.find(c => c.id === caseId);
  }
}

export const agencyMock = new AgencyMockService();
