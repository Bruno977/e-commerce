import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import * as request from 'supertest';

describe('UploadAttachmentController (E2E)', () => {
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
  it('/POST /files', async () => {
    const user = await prisma.user.create({
      data: PrismaUserMapper.toPrisma(makeFakeUser()),
    });
    const accessToken = jwt.sign({
      sub: user.id,
      role: user.role,
    });
    const result = await request(app.getHttpServer())
      .post(`/files`)
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/sample-image.jpg');
    expect(result.statusCode).toBe(201);
    expect(result.body).toHaveProperty('attachmentId');
  });
});
