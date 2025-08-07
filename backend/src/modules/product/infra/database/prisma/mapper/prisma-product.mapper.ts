import { Product } from 'src/modules/product/domain/entities/product';
import { Prisma, Product as ProductPrisma } from '@prisma/client';
import { Price } from 'src/modules/product/domain/value-objects/price';
import { Stock } from 'src/modules/product/domain/value-objects/stock';
import { Id } from 'src/lib/common/entities/id';

interface AttachmentProps {
  id: string;
}
interface CategoryProps {
  id: string;
}
export class PrismaProductMapper {
  static toDomain(
    prismaProduct: ProductPrisma & {
      categories: CategoryProps[];
      attachments: AttachmentProps[];
    },
  ): Product {
    return Product.create(
      {
        name: prismaProduct.name,
        description: prismaProduct.description,
        price: Price.createWithDiscount(
          prismaProduct.originalPrice,
          prismaProduct.discount ?? 0,
        ),
        stock: new Stock(prismaProduct.stock),
        createdAt: prismaProduct.createdAt,
        updatedAt: prismaProduct.updatedAt,
        categoryIds: prismaProduct.categories.map((category) =>
          Id.create(category.id),
        ),
        isActive: prismaProduct.isActive,
        attachmentIds: prismaProduct.attachments.map((attachment) =>
          Id.create(attachment.id),
        ),
      },
      Id.create(prismaProduct.id),
    );
  }

  static toPrisma(product: Product): Prisma.ProductCreateInput {
    const prismaProduct: Prisma.ProductCreateInput = {
      name: product.name,
      description: product.description,
      price: product.currentPrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      stock: product.getStock,
      categories: {
        connect: product.categoryIds.map((categoryId) => ({
          id: categoryId.toString(),
        })),
      },
    };

    return prismaProduct;
  }
}
