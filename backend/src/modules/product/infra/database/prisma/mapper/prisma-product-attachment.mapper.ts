import { Prisma, Attachment as prismaAttachment } from '@prisma/client';
import { Id } from 'src/lib/common/entities/id';
import { Attachment } from 'src/modules/product/domain/entities/attachment';

export class PrismaProductAttachmentMapper {
  static toDomain(raw: prismaAttachment): Attachment {
    return Attachment.create(
      {
        url: raw.url,
        title: raw.title,
      },
      Id.create(raw.id),
    );
  }

  static toPrisma(attachment: Attachment): Prisma.AttachmentCreateInput {
    return {
      url: attachment.url,
      title: attachment.title || '',
    };
  }
}
