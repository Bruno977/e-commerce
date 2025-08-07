import { Attachment } from '../../domain/entities/attachment';
import { AttachmentRepository } from '../../domain/repositories/attachment.repository';

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public attachments: Attachment[] = [];

  async create(attachment: Attachment) {
    this.attachments.push(attachment);
    return attachment;
  }
  async findById(id: string) {
    const attachment = this.attachments.find(
      (attachment) => attachment.id.toString() === id,
    );
    if (!attachment) {
      return null;
    }
    return attachment;
  }
  async findByIds(ids: string[]) {
    const attachments = this.attachments.filter((attachment) =>
      ids.includes(attachment.id.toString()),
    );
    if (!attachments) {
      return [];
    }
    return attachments;
  }
  async delete(id: string): Promise<void> {
    const index = this.attachments.findIndex(
      (attachment) => attachment.id.toString() === id,
    );
    if (index !== -1) {
      this.attachments.splice(index, 1);
    }
  }
}
