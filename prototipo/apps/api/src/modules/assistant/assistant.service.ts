// Servicio del asistente virtual (RF-06, RF-08)
// Orquestador de diálogo según MADR-0014, MADR-0015
import { nluAdapter } from './nlu-rule-based.adapter';
import { agencyMock } from './agency-mock.service';
import { tripsService } from '../trips-reservations/trips.service';
import { randomUUID } from 'crypto';

export class AssistantService {
  async processMessage(userId: string, message: string, sessionId?: string) {
    const sid = sessionId || randomUUID();
    const nluResult = nluAdapter.detectIntent(message);
    
    let response = '';
    let action = null;
    let handoff = null;

    switch (nluResult.intent) {
      case 'consultar_estado_viaje':
        const trips = tripsService.getTripsWithReservations(userId);
        if (trips.length > 0) {
          response = `Tienes ${trips.length} viaje(s). El estado de tu viaje más reciente: ${trips[0].trip.status}.`;
        } else {
          response = 'No tienes viajes registrados.';
        }
        action = 'consultar_estado';
        break;
      
      case 'solicitar_reprogramacion':
        response = 'Puedo ayudarte con una reprogramación, pero para cambios complejos necesito escalarte a la agencia. ¿Deseas que te conecte con ellos?';
        action = 'sugerir_handoff';
        break;
      
      case 'escalar_a_agencia':
        const handoffResult = await agencyMock.createCase({
          userId,
          message,
          reason: 'user_request',
        });
        response = `Te he escalado a la agencia de viajes preferida. Caso: ${handoffResult.caseId}. Estado: ${handoffResult.status}.`;
        handoff = handoffResult;
        action = 'handoff';
        break;
      
      default:
        response = 'Soy tu asistente de viajes. Puedo ayudarte a consultar el estado de tus viajes, o escalarte a la agencia si tienes un problema. ¿En qué te puedo ayudar?';
        break;
    }

    return {
      sessionId: sid,
      response,
      intent: nluResult.intent,
      confidence: nluResult.confidence,
      action,
      handoff,
    };
  }
}

export const assistantService = new AssistantService();
