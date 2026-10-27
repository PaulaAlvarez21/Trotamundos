// NLU rule-based para el asistente (MADR-0016 - build vs buy)
// Sin proveedor pago, solo reglas por keywords
export class NluRuleBasedAdapter {
  detectIntent(message: string): { intent: string; confidence: number; entities?: any } {
    const lower = message.toLowerCase();
    
    if (lower.includes('estado') || lower.includes('consultar') || lower.includes('dónde')) {
      return { intent: 'consultar_estado_viaje', confidence: 0.8 };
    }
    if (lower.includes('reprogramar') || lower.includes('cambiar fecha')) {
      return { intent: 'solicitar_reprogramacion', confidence: 0.8 };
    }
    if (lower.includes('cancelar')) {
      return { intent: 'solicitar_cancelacion', confidence: 0.8 };
    }
    if (lower.includes('problema') || lower.includes('ayuda') || lower.includes('agencia')) {
      return { intent: 'escalar_a_agencia', confidence: 0.9 };
    }
    
    return { intent: 'unknown', confidence: 0.3 };
  }
}

export const nluAdapter = new NluRuleBasedAdapter();
