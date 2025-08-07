import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaUserMapper } from 'src/modules/auth/infra/database/prisma/mappers/prisma-user.mapper';
import { makeFakeUser } from 'src/modules/auth/test/factories/make-fake-user';
import { PrismaCategoryMapper } from 'src/modules/category/infra/database/prisma/mapper/prisma-category.mapper';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { PrismaProductMapper } from '../../database/prisma/mapper/prisma-product.mapper';
import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import { Id } from 'src/lib/common/entities/id';
import { PrismaProductAttachmentMapper } from '../../database/prisma/mapper/prisma-product-attachment.mapper';
import { makeFakeAttachment } from 'src/modules/product/test/factories/make-fake-attachment';
import * as request from 'supertest';

describe('RemoveAttachmentFromProductController (E2E)', () => {
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
  it('/DELETE /products/:productId/attachments/:attachmentId', async () => {
    const user = await prisma.user.create({
      data: PrismaUserMapper.toPrisma(makeFakeUser()),
    });
    const accessToken = jwt.sign({
      sub: user.id,
      role: user.role,
    });
    const category = await prisma.category.create({
      data: PrismaCategoryMapper.toPrisma(makeFakeCategory()),
    });
    const attachment = await prisma.attachment.create({
      data: PrismaProductAttachmentMapper.toPrisma(makeFakeAttachment()),
    });
    const newProduct = await prisma.product.create({
      data: {
        ...PrismaProductMapper.toPrisma(
          makeFakeProduct({
            categoryIds: [new Id(category.id)],
          }),
        ),
        attachments: {
          connect: [{ id: attachment.id }],
        },
      },
    });
    const currentProduct = await prisma.product.findFirst({
      include: {
        attachments: true,
      },
    });
    expect(currentProduct?.attachments.length).toBe(1);

    const result = await request(app.getHttpServer())
      .patch(`/products/${newProduct.id}/attachments/remove`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        attachmentIds: [attachment.id],
      });

    expect(result.status).toBe(204);

    const p = await prisma.product.findFirst({
      include: {
        attachments: true,
      },
    });
    expect(p?.attachments.length).toBe(0);
  });
});
