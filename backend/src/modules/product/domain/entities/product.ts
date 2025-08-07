import { Entity } from 'src/lib/common/entities/entity';
import { Price } from '../value-objects/price';
import { Id } from 'src/lib/common/entities/id';
import { Stock } from '../value-objects/stock';
import { Optional } from 'src/lib/common/types/optional';

export interface ProductProps {
  name: string;
  description: string;
  price: Price;
  stock: Stock;
  categoryIds: Id[];
  attachmentIds: Id[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Product extends Entity<ProductProps> {
  static create(
    props: Optional<
      ProductProps,
      'attachmentIds' | 'createdAt' | 'updatedAt' | 'isActive'
    >,
    id?: Id,
  ) {
    const now = new Date();
    return new Product(
      {
        ...props,
        attachmentIds: props.attachmentIds ?? [],
        isActive: props.isActive ?? true,
        createdAt: now,
        updatedAt: now,
      },
      id,
    );
  }

  private updateTimestamp() {
    this.props.updatedAt = new Date();
  }
  get currentPrice() {
    return this.props.price.getPriceWithDiscount();
  }
  get originalPrice() {
    return this.props.price.getOriginalPrice();
  }
  get discount() {
    return this.props.price.getDiscount();
  }
  get name() {
    return this.props.name;
  }
  get getStock() {
    return this.props.stock.getQuantity();
  }
  get description() {
    return this.props.description;
  }
  get attachmentIds() {
    return this.props.attachmentIds;
  }
  get categoryIds() {
    return this.props.categoryIds;
  }
  get isActive() {
    return this.props.isActive;
  }
  updateStock(newStock: Stock) {
    this.props.stock.updateQuantity(newStock.getQuantity());
  }
  updateDescription(description: string) {
    this.props.description = description;
    this.updateTimestamp();
  }
  updateName(name: string) {
    this.props.name = name;
    this.updateTimestamp();
  }
  updatePrice(price: Price) {
    this.props.price = price;
    this.updateTimestamp();
  }
  applyDiscount(discount: number) {
    this.props.price = this.props.price.applyDiscount(discount);
    this.updateTimestamp();
  }
  addAttachments(attachmentIds: Id[]) {
    const currentAttachmentIds = new Set(
      this.props.attachmentIds.map((attachment) => attachment.toString()),
    );

    attachmentIds.forEach((attachmentId) => {
      if (!currentAttachmentIds.has(attachmentId.toString())) {
        this.props.attachmentIds.push(attachmentId);
        currentAttachmentIds.add(attachmentId.toString());
      }
    });
    this.updateTimestamp();
  }

  removeAttachments(attachmentIds: Id[]) {
    this.props.attachmentIds = this.props.attachmentIds.filter(
      (attachmentId) => !attachmentIds.some((id) => attachmentId.equals(id)),
    );
    this.updateTimestamp();
  }

  addCategoriesToProduct(categoryIds: Id[]) {
    const currentCategoryIds = new Set(
      this.props.categoryIds.map((category) => category.toString()),
    );

    categoryIds.forEach((categoryId) => {
      if (!currentCategoryIds.has(categoryId.toString())) {
        this.props.categoryIds.push(categoryId);
        currentCategoryIds.add(categoryId.toString());
      }
    });

    this.updateTimestamp();
  }

  removeCategoriesFromProduct(categoryIds: Id[]) {
    this.props.categoryIds = this.props.categoryIds.filter(
      (categoryId) => !categoryIds.some((id) => categoryId.equals(id)),
    );
    this.updateTimestamp();
  }
}
