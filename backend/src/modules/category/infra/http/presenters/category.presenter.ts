import { Category } from 'src/modules/category/domain/entities/category';

export class CategoryPresenter {
  static toHttp(category: Category | null) {
    return {
      id: category?.id.toString(),
      title: category?.title,
      slug: category?.slug.getValue(),
      is_active: category?.isActive,
      product_count: category?.productCount,
      description: category?.description,
      created_at: category?.createdAt,
      updated_at: category?.updatedAt,
    };
  }
}
