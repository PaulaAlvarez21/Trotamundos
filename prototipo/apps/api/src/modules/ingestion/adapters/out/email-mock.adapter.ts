// Adaptador mock para correo - simula IMAP
// Mantiene ACL explícita según MADR-0005
import { EmailPort } from '../../ports/email.port';
import { EmailMessage } from '../../../../../../../packages/domain/entities';
import * as emailsData from '../../../../../../../packages/mocks/emails.json';

export class EmailMockAdapter implements EmailPort {
  private whitelist = ['reservas@vuelos.com', 'hotel@reservas.com'];

  async fetchEmails(userId: string): Promise<EmailMessage[]> {
    // Filtramos solo los whitelisted (RF-07)
    const emails = (emailsData as any[]).filter(e => this.isWhitelisted(e.from));
    return emails.map(e => ({
      id: e.id,
      from: e.from,
      subject: e.subject,
      body: e.body,
      receivedAt: new Date(e.receivedAt),
      userId,
    }));
  }

  isWhitelisted(from: string): boolean {
    return this.whitelist.includes(from);
  }

  addToWhitelist(from: string) {
    if (!this.whitelist.includes(from)) {
      this.whitelist.push(from);
    }
  }
}
