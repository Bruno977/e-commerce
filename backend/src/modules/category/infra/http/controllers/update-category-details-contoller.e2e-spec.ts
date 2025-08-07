import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { PrismaCategoryMapper } from '../../database/prisma/mapper/prisma-category.mapper';
import * as request from 'supertest';

describe('UpdateCategoryDetailsController (E2E)', () => {
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

  it('should be able to update a category', async () => {
    const newUser = makeFakeUser();
    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(newUser),
    });
    const accessToken = jwt.sign({
      sub: newUser.id.toString(),
      role: newUser.role.getValue(),
    });

    const newCategory = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(
        makeFakeCategory({
          title: 'New Category',
          description: 'New Category Description',
        }),
      ),
    });

    const response = await request(app.getHttpServer())
      .put(`/categories/${newCategory.id}`)
      .send({
        title: 'Update Category',
        description: 'Update Category Description',
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(204);

    const categoryItem = await prisma.category.findFirst();
    expect(categoryItem?.title).toBe('Update Category');
    expect(categoryItem?.slug).toBe('update-category');
    expect(categoryItem?.description).toBe('Update Category Description');
  });
});
