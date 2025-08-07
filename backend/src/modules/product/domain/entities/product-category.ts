import { Entity } from 'src/lib/common/entities/entity';
import { Id } from 'src/lib/common/entities/id';

interface ProductCategoryProps {
  title: string;
}
export class ProductCategory extends Entity<ProductCategoryProps> {
  static create(props: ProductCategoryProps, id?: Id) {
    return new ProductCategory(props, id);
  }
  get title() {
    return this.props.title;
  }
  updateTitle(title: string) {
    this.props.title = title;
  }
  equals(category: ProductCategory): boolean {
    return this.id.equals(category.id);
  }
}
