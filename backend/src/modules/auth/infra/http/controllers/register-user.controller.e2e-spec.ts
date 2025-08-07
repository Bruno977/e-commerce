import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';

describe('Register Controller (E2E)', () => {
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

  it('/POST /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'admin',
    });
    expect(response.status).toBe(201);
    const user = await prisma.user.findFirst();
    expect(user?.email).toBe('johndoe@example.com');
  });
});
