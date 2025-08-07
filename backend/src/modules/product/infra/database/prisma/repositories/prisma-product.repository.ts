import { Product } from 'src/modules/product/domain/entities/product';
import {
  attachmentToProductProps,
  PaginatedProducts,
  ProductRepository,
} from 'src/modules/product/domain/repositories/product.repository';
import { PrismaProductMapper } from '../mapper/prisma-product.mapper';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/lib/common/types/pagination-params';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product);
    await this.prisma.product.create({
      data,
    });
  }
  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
        attachments: true,
      },
    });
    if (!product) {
      return null;
    }
    return PrismaProductMapper.toDomain(product);
  }
  async findByIds(ids: string[]): Promise<Product[] | null> {
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        categories: true,
        attachments: true,
      },
    });
    if (!products) {
      return null;
    }
    return products.map((product) => PrismaProductMapper.toDomain(product));
  }
  async findByCategoryId(categoryId: string): Promise<Product[] | null> {
    const products = await this.prisma.product.findMany({
      where: {
        categories: {
          some: {
            id: categoryId,
          },
        },
      },
      include: {
        categories: true,
        attachments: true,
      },
    });
    if (!products) {
      return null;
    }
    return products.map((product) => PrismaProductMapper.toDomain(product));
  }
  async findAll(params: PaginationParams): Promise<PaginatedProducts> {
    const { page, perPage } = params;
    const take = perPage;
    const skip = (page - 1) * take;

    const [products, totalItems] = await Promise.all([
      this.prisma.product.findMany({
        include: {
          categories: true,
          attachments: true,
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      this.prisma.product.count(),
    ]);
    const domainProducts = products.map((product) =>
      PrismaProductMapper.toDomain(product),
    );

    return { products: domainProducts, totalItems };
  }
  async remove(productId: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
  async update(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product);
    await this.prisma.product.update({
      where: {
        id: product.id.toString(),
      },
      data,
      include: {
        categories: true,
      },
    });
  }

  async addAttachmentToProduct({
    attachmentIds,
    productId,
  }: attachmentToProductProps) {
    await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        attachments: {
          connect: attachmentIds.map((attachmentId) => ({
            id: attachmentId.toString(),
          })),
        },
      },
    });
  }

  async removeAttachmentFromProduct({
    attachmentIds,
    productId,
  }: attachmentToProductProps) {
    await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        attachments: {
          disconnect: attachmentIds.map((attachmentId) => ({
            id: attachmentId.toString(),
          })),
        },
      },
    });
  }
}
