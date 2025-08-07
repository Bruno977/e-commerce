import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';

import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { PrismaCategoryMapper } from '../../database/prisma/mapper/prisma-category.mapper';

describe('FindCategoryByIdController (E2E)', () => {
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
  it('/GET /categories/:id', async () => {
    const newCategory = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(
        makeFakeCategory({
          title: 'Electronics category',
          description: 'Devices and gadgets',
        }),
      ),
    });
    const response = await request(app.getHttpServer()).get(
      `/categories/${newCategory.id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      category: {
        id: newCategory.id,
        title: 'Electronics category',
        slug: 'electronics-category',
        description: 'Devices and gadgets',
        created_at: newCategory.createdAt.toISOString(),
        updated_at: newCategory.updatedAt.toISOString(),
      },
    });
  });
});
