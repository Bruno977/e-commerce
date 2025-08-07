import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { AttachmentRepository } from '../../domain/repositories/attachment.repository';
import { AttachmentStorage } from '../storage/uploader';
import { Injectable } from '@nestjs/common';

type RemoveAttachmentResponse = Promise<Either<ResourceNotFoundError, null>>;

@Injectable()
export class RemoveAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentRepository,
    private attachmentStorage: AttachmentStorage,
  ) {}

  async execute(attachmentId: string): RemoveAttachmentResponse {
    const attachment = await this.attachmentRepository.findById(attachmentId);

    if (!attachment) {
      return left(new ResourceNotFoundError('Attachment not found'));
    }

    await this.attachmentStorage.delete(attachment.url);

    await this.attachmentRepository.delete(attachmentId);

    return right(null);
  }
}
