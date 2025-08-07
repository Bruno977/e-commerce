import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaProductMapper } from '../../database/prisma/mapper/prisma-product.mapper';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';
import { PrismaCategoryMapper } from 'src/modules/category/infra/database/prisma/mapper/prisma-category.mapper';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import * as request from 'supertest';
import { Id } from 'src/lib/common/entities/id';

describe('AddCategoryToProductController (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    await app.init();
  });

  it('/POST /products/:productId/categories', async () => {
    const user = await prisma.user.create({
      data: PrismaUserMapper.toPrisma(makeFakeUser()),
    });
    const accessToken = jwt.sign({
      sub: user.id,
      role: user.role,
    });
    const category = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(makeFakeCategory()),
    });
    const product = await prisma.product.create({
      data: PrismaProductMapper.toPrisma(
        makeFakeProduct({
          categoryIds: [new Id(category.id)],
        }),
      ),
    });
    const categoryToAdd = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(makeFakeCategory()),
    });
    const result = await request(app.getHttpServer())
      .patch(`/products/${product.id}/categories`)
      .send({
        categoryIds: [categoryToAdd.id],
      })
      .set('Authorization', `Bearer ${accessToken}`);
    expect(result.status).toBe(200);
    const updatedProduct = await prisma.product.findUnique({
      where: { id: product.id },
      include: { categories: true },
    });
    expect(updatedProduct?.categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: categoryToAdd.id,
          title: categoryToAdd.title,
        }),
      ]),
    );
    expect(updatedProduct?.categories).toHaveLength(2);
  });
});
