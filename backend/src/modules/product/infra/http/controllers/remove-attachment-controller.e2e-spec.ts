import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import * as request from 'supertest';

describe('RemoveAttachmentController (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let s3Client: S3Client;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    s3Client = moduleRef.get<S3Client>(S3Client);

    await app.init();
  });
  it('/DELETE /files/:attachmentId', async () => {
    const user = await prisma.user.create({
      data: PrismaUserMapper.toPrisma(makeFakeUser()),
    });
    const accessToken = jwt.sign({
      sub: user.id,
      role: user.role,
    });

    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-test-image.jpg`;

    const fileContent = readFileSync('./test/sample-image.jpg');
    const fileType = 'image/jpeg';

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: uniqueFileName,
        Body: fileContent,
        ContentType: fileType,
      }),
    );
    const attachment = await prisma.attachment.create({
      data: {
        title: 'Test Image',
        url: uniqueFileName,
      },
    });
    const result = await request(app.getHttpServer())
      .delete(`/files/${attachment.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(result.statusCode).toBe(204);
  });
});
