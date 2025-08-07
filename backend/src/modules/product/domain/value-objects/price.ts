export class Price {
  private discount: number;
  private originalPrice: number;
  private discountedPrice: number;

  private constructor(originalPrice: number, discount: number = 0) {
    this.originalPrice = originalPrice;
    this.discount = discount;
    this.discountedPrice = this.calculateDiscountedPrice();
  }

  static create(originalPrice: number) {
    if (originalPrice < 0) {
      throw new Error('Price cannot be negative.');
    }
    return new Price(originalPrice, 0);
  }

  static createWithDiscount(originalPrice: number, discount: number = 0) {
    if (originalPrice < 0) {
      throw new Error('Price cannot be negative.');
    }
    if (discount < 0 || discount > 100) {
      throw new Error('Discount must be between 0 and 100.');
    }
    return new Price(originalPrice, discount);
  }

  private calculateDiscountedPrice(): number {
    return this.originalPrice * ((100 - this.discount) / 100);
  }

  getPriceWithDiscount(): number {
    return this.discountedPrice;
  }

  getOriginalPrice(): number {
    return this.originalPrice;
  }

  getDiscount(): number {
    return this.discount;
  }

  applyDiscount(discount: number) {
    if (discount < 0 || discount > 100) {
      throw new Error('Discount must be between 0 and 100.');
    }

    return new Price(this.originalPrice, discount);
  }
  removeDiscount() {
    return new Price(this.originalPrice, 0);
  }
}
