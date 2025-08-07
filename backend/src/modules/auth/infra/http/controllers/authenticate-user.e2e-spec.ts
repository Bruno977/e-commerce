import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('Authenticate Controller (E2E)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST /sessions', async () => {
    await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: 'admin',
    });
    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      access_token: expect.any(String) as string,
    });
  });
});
