import { Encrypt } from '../../application/cryptography/encrypt';

export class FakeEncrypt implements Encrypt {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
