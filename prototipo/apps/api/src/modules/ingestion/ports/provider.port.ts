// Puerto para proveedores externos
import { Reservation } from '../../../../../../packages/domain/entities';

export interface ProviderPort {
  pollUpdates(): Promise<any[]>;
}
