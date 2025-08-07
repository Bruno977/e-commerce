import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { JwtService } from '@nestjs/jwt';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';

describe('Create Category Controller (E2E)', () => {
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
  it('/PUT /categories', async () => {
    const user = makeFakeUser();
    await prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });
    const accessToken = jwt.sign({
      sub: user.id.toString(),
      role: user.role.getValue(),
    });

    const initialCategory = await prisma.category.findFirst({
      where: { title: 'Electronics' },
    });
    const initialUpdatedAt = initialCategory?.updatedAt;

    const response = await request(app.getHttpServer())
      .post('/categories')
      .send({
        title: 'Electronics',
        description: 'Devices and gadgets',
      })
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(201);

    const category = await prisma.category.findFirst({
      where: { title: 'Electronics' },
    });
    expect(category?.title).toBe('Electronics');
    expect(category?.description).toBe('Devices and gadgets');
    expect(category?.slug).toBe('electronics');
    expect(category?.updatedAt).toBeDefined();
    if (initialUpdatedAt) {
      expect(category?.updatedAt.getTime()).toBeGreaterThan(
        initialUpdatedAt.getTime(),
      );
    }
  });
});
