import { Attachment } from '../entities/attachment';

export abstract class AttachmentRepository {
  abstract create(attachment: Attachment): Promise<Attachment>;
  abstract findById(id: string): Promise<Attachment | null>;
  abstract findByIds(ids: string[]): Promise<Attachment[]>;
  abstract delete(id: string): Promise<void>;
}
