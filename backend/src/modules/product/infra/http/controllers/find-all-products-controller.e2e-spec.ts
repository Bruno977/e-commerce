import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaProductMapper } from '../../database/prisma/mapper/prisma-product.mapper';
import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import { PrismaCategoryMapper } from 'src/modules/category/infra/database/prisma/mapper/prisma-category.mapper';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { Id } from 'src/lib/common/entities/id';
import * as request from 'supertest';

describe('RemoveProductController (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });
  it('should return all products', async () => {
    const category = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(makeFakeCategory()),
    });
    for (let i = 0; i < 10; i++) {
      await prisma.product.create({
        data: PrismaProductMapper.toPrisma(
          makeFakeProduct({
            categoryIds: [new Id(category.id)],
          }),
        ),
      });
    }
    const result = await request(app.getHttpServer()).get(
      `/products?page=1&perPage=5`,
    );
    expect(result.status).toBe(200);
    expect(result.body).toEqual(
      expect.objectContaining({
        products: expect.any(Array),
        pagination: expect.objectContaining({
          currentPage: 1,
          perPage: 5,
          totalPages: 2,
          totalItems: 10,
        }),
      }),
    );
  });
});
