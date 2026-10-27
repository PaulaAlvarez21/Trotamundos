// Adaptador mock para proveedores
import { ProviderPort } from '../../ports/provider.port';
import providersData from '../../../../../../../packages/mocks/providers.json';

export class ProviderMockAdapter implements ProviderPort {
  async pollUpdates(): Promise<any[]> {
    return providersData;
  }
}
