import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import { makeFakeProductData } from 'src/modules/product/test/factories/make-fake-product';
import * as request from 'supertest';
import { PrismaCategoryMapper } from 'src/modules/category/infra/database/prisma/mapper/prisma-category.mapper';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';

describe('CreateProductController (E2E)', () => {
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
  it('/POST /products', async () => {
    const user = await prisma.user.create({
      data: PrismaUserMapper.toPrisma(makeFakeUser()),
    });
    const accessToken = jwt.sign({
      sub: user.id,
      role: user.role,
    });

    const category1 = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(
        makeFakeCategory({
          title: 'Category 1',
        }),
      ),
    });
    const category2 = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(
        makeFakeCategory({
          title: 'Category 2',
        }),
      ),
    });
    const newProduct = makeFakeProductData({
      name: 'Product 1',
      price: 100,
      discount: 10,
      categoryIds: [category1.id, category2.id],
    });

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(newProduct)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(201);
    const product = await prisma.product.findFirst({
      where: { name: 'Product 1' },
      include: { attachments: true, categories: true },
    });
    expect(product?.name).toBe('Product 1');
    expect(product?.description).toBe(newProduct.description);
    expect(product?.price).toBe(90);
    expect(product?.originalPrice).toBe(100);
    expect(product?.stock).toBe(newProduct.stock);
    expect(product?.discount).toBe(10);
    expect(product?.attachments).toHaveLength(0);
    expect(product?.categories).toHaveLength(2);
  });
});
