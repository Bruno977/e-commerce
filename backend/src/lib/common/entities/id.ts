export class Id {
  constructor(private readonly _value: string) {
    if (!this._value) {
      throw new Error('Id cannot be empty');
    }
  }
  static create(id?: string): Id {
    return new Id(id ?? crypto.randomUUID());
  }
  toValue(): string {
    return this._value;
  }
  toString(): string {
    return this._value;
  }
  equals(id: Id): boolean {
    return this._value === id._value;
  }
}
