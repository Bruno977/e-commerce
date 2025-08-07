import { Product } from 'src/modules/product/domain/entities/product';
export class ProductPresenter {
  static toHttp(product: Product) {
    return {
      id: product?.id.toString(),
      name: product?.name,
      description: product?.description,
      price: product?.currentPrice,
      originalPrice: product?.originalPrice,
      discount: product?.discount,
      stock: product?.getStock,
      categories: product?.categoryIds.map((categoryId) =>
        categoryId.toString(),
      ),
      attachments: product?.attachmentIds.map((attachmentId) =>
        attachmentId.toString(),
      ),
    };
  }
}
