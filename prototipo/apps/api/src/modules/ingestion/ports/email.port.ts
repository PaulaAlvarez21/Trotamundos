// Puerto para obtener correos - define contrato, no implementación
// Según MADR-0005 (Ports & Adapters)
import { EmailMessage } from '../../../../../../packages/domain/entities';

export interface EmailPort {
  fetchEmails(userId: string): Promise<EmailMessage[]>;
  isWhitelisted(from: string): boolean;
}
