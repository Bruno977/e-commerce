import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { AttachmentRepository } from 'src/modules/product/domain/repositories/attachment.repository';
import { Attachment } from 'src/modules/product/domain/entities/attachment';
import { PrismaProductAttachmentMapper } from '../mapper/prisma-product-attachment.mapper';

@Injectable()
export class PrismaProductAttachmentRepository implements AttachmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment) {
    const data = PrismaProductAttachmentMapper.toPrisma(attachment);
    const newAttachment = await this.prisma.attachment.create({
      data,
    });
    return PrismaProductAttachmentMapper.toDomain(newAttachment);
  }
  async findById(id: string): Promise<Attachment | null> {
    const productAttachment = await this.prisma.attachment.findUnique({
      where: { id },
    });
    if (!productAttachment) {
      return null;
    }
    return PrismaProductAttachmentMapper.toDomain(productAttachment);
  }
  async findByIds(ids: string[]): Promise<Attachment[]> {
    const productAttachments = await this.prisma.attachment.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return productAttachments.map((productAttachment) =>
      PrismaProductAttachmentMapper.toDomain(productAttachment),
    );
  }
  async delete(id: string): Promise<void> {
    await this.prisma.attachment.delete({
      where: { id },
    });
  }
}
