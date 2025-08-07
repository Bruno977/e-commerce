import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import { PrismaProductMapper } from '../../database/prisma/mapper/prisma-product.mapper';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import { JwtService } from '@nestjs/jwt';
import { PrismaCategoryMapper } from 'src/modules/category/infra/database/prisma/mapper/prisma-category.mapper';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { Id } from 'src/lib/common/entities/id';
import * as request from 'supertest';

describe('UpdateProductDetailsController (E2E)', () => {
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
  it('/PUT /products/:id', async () => {
    const user = await prisma.user.create({
      data: PrismaUserMapper.toPrisma(makeFakeUser()),
    });
    const accessToken = jwt.sign({
      sub: user.id,
      role: user.role,
    });
    const category1 = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(makeFakeCategory()),
    });
    const newProduct = makeFakeProduct({
      categoryIds: [new Id(category1.id)],
    });
    const product = await prisma.product.create({
      data: PrismaProductMapper.toPrisma(newProduct),
    });
    const result = await request(app.getHttpServer())
      .put(`/products/${product.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Updated Product Name',
        description: 'Updated Product Description',
        price: 200,
        discount: 20,
        stock: 50,
      });
    expect(result.status).toBe(204);
    const updatedProduct = await prisma.product.findUnique({
      where: { id: product.id },
    });
    expect(updatedProduct?.name).toBe('Updated Product Name');
    expect(updatedProduct?.description).toBe('Updated Product Description');
    expect(updatedProduct?.originalPrice).toBe(200);
    expect(updatedProduct?.price).toBe(160);
    expect(updatedProduct?.discount).toBe(20);
    expect(updatedProduct?.stock).toBe(50);
  });
});
