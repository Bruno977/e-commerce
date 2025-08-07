import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { PrismaCategoryMapper } from '../../database/prisma/mapper/prisma-category.mapper';

describe('RemoveCategoryController (E2E)', () => {
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
  it('should be able to remove a category', async () => {
    const user = makeFakeUser();
    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });
    const accessToken = jwt.sign({
      sub: user.id.toString(),
      role: user.role.getValue(),
    });
    const category = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(makeFakeCategory()),
    });
    const response = await request(app.getHttpServer())
      .delete(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(204);
  });
});
