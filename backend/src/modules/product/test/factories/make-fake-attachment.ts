import { faker } from '@faker-js/faker/.';
import { Attachment, AttachmentProps } from '../../domain/entities/attachment';

export function makeFakeAttachment(
  override: Partial<AttachmentProps> = {},
): Attachment {
  return Attachment.create({
    url: faker.image.url(),
    title: faker.lorem.sentence(),
    ...override,
  });
}
