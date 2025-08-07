import { Either, left, right } from 'src/lib/common/either/either';

import { Injectable } from '@nestjs/common';
import { InvalidValueError } from 'src/lib/common/errors/invalid-value-error';
import { Attachment } from '../../domain/entities/attachment';
import { AttachmentRepository } from '../../domain/repositories/attachment.repository';
import { IUploadAttachment } from '../interfaces/upload-attachment';
import { AttachmentStorage } from '../storage/uploader';

type UploadAttachmentsUseCaseResponse = Promise<
  Either<
    InvalidValueError,
    {
      attachment: Attachment;
    }
  >
>;
@Injectable()
export class UploadAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentRepository,
    private attachmentStorage: AttachmentStorage,
  ) {}
  async execute({
    fileType,
    fileName,
    body,
  }: IUploadAttachment): UploadAttachmentsUseCaseResponse {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidValueError(fileType));
    }
    const { url } = await this.attachmentStorage.upload({
      fileName,
      fileType,
      body,
    });
    const attachment = Attachment.create({
      title: fileName,
      url,
    });

    const result = await this.attachmentRepository.create(attachment);

    return right({
      attachment: result,
    });
  }
}
