export class Email {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  getValue(): string {
    return this._value;
  }

  static create(value: string): Email {
    return new Email(value);
  }

  static isValid(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
}
