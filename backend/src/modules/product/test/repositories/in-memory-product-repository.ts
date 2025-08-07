import { PaginationParams } from 'src/lib/common/types/pagination-params';
import { Product } from '../../domain/entities/product';
import {
  attachmentToProductProps,
  PaginatedProducts,
  ProductRepository,
} from '../../domain/repositories/product.repository';

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find(
      (product) => product.id.toString() === id,
    );
    if (!product) {
      return null;
    }
    return product;
  }
  async findByIds(ids: string[]): Promise<Product[] | null> {
    const products = this.products.filter((product) =>
      ids.includes(product.id.toString()),
    );
    if (!products) {
      return null;
    }
    return products;
  }
  async findByCategoryId(categoryId: string): Promise<Product[] | null> {
    const products = this.products.filter((product) =>
      product.categoryIds.some((id) => id.toString() === categoryId),
    );
    if (!products) {
      return null;
    }
    return products;
  }

  async findAll(params: PaginationParams): Promise<PaginatedProducts> {
    const { page, perPage = 20 } = params;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedCategories = this.products.slice(startIndex, endIndex);
    const totalItems = this.products.length;

    return {
      products: paginatedCategories,
      totalItems,
    };
  }

  async remove(productId: string): Promise<void> {
    const productIndex = this.products.findIndex(
      (product) => product.id.toString() === productId,
    );
    if (productIndex === -1) {
      return;
    }
    this.products.splice(productIndex, 1);
  }

  async update(product: Product): Promise<void> {
    const productIndex = this.products.findIndex(
      (p) => p.id.toString() === product.id.toString(),
    );
    if (productIndex === -1) {
      this.products[productIndex] = product;
    }
    this.products[productIndex] = product;
  }
  async addAttachmentToProduct({
    attachmentIds,
    productId,
  }: attachmentToProductProps) {
    const productIndex = this.products.findIndex(
      (product) => product.id.toString() === productId,
    );
    if (productIndex === -1) {
      return;
    }
    const product = this.products[productIndex];
    product.addAttachments(attachmentIds);
    this.products[productIndex] = product;
  }
  async removeAttachmentFromProduct({
    attachmentIds,
    productId,
  }: attachmentToProductProps) {
    const productIndex = this.products.findIndex(
      (product) => product.id.toString() === productId,
    );
    if (productIndex === -1) {
      return;
    }

    const product = this.products[productIndex];
    product.removeAttachments(attachmentIds);
    this.products[productIndex] = product;
  }
}
