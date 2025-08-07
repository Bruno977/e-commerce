import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import { PrismaCategoryMapper } from 'src/modules/category/infra/database/prisma/mapper/prisma-category.mapper';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { PrismaProductMapper } from '../../database/prisma/mapper/prisma-product.mapper';
import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import { Id } from 'src/lib/common/entities/id';
import * as request from 'supertest';

describe('RemoveCategoryFromProductController E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    jwt = moduleRef.get<JwtService>(JwtService);

    await app.init();
  });
  it('/ DELETE /products/:productId/categories/:categoryId', async () => {
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
    const result = await request(app.getHttpServer())
      .patch(`/products/${product.id}/categories/remove`)
      .send({
        categoryIds: [category.id],
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(result.status).toBe(204);

    const updatedProduct = await prisma.product.findUnique({
      where: { id: product.id },
      select: {
        categories: true,
      },
    });
    expect(updatedProduct?.categories).not.toContain(category.id);
  });
});
