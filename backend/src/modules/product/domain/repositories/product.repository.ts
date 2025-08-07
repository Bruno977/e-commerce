import { Id } from 'src/lib/common/entities/id';
import { Product } from '../entities/product';
import { PaginationParams } from 'src/lib/common/types/pagination-params';

export interface attachmentToProductProps {
  productId: string;
  attachmentIds: Id[];
}
export interface PaginatedProducts {
  products: Product[];
  totalItems: number;
}

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findByIds(ids: string[]): Promise<Product[] | null>;
  abstract findByCategoryId(categoryId: string): Promise<Product[] | null>;
  abstract findAll(params: PaginationParams): Promise<PaginatedProducts>;
  abstract remove(productId: string): Promise<void>;
  abstract update(product: Product): Promise<void>;
  abstract addAttachmentToProduct({
    attachmentIds,
    productId,
  }: attachmentToProductProps): Promise<void>;
  abstract removeAttachmentFromProduct({
    attachmentIds,
    productId,
  }: attachmentToProductProps): Promise<void>;
}
