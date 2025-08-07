export class Password {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  getValue(): string {
    return this._value;
  }

  static create(value: string): Password {
    return new Password(value);
  }

  static isValid(value: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(value);
  }
}
