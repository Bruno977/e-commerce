export abstract class Encrypt {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}
