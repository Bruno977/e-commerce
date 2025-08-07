export class Stock {
  private quantity: number;

  constructor(quantity: number) {
    if (quantity < 0) {
      throw new Error('Stock quantity cannot be negative');
    }
    this.quantity = quantity;
  }

  getQuantity(): number {
    return this.quantity;
  }
  updateQuantity(value: number) {
    if (value < 0) {
      throw new Error('Stock quantity cannot be negative');
    }
    this.quantity = value;
  }
}
