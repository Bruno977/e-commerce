import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { AttachmentRepository } from '../../domain/repositories/attachment.repository';
import { IAddAttachmentToProduct } from '../interfaces/add-attachment-to-product';
import { Injectable } from '@nestjs/common';

type ResponseAddAttachmentUseCase = Promise<
  Either<ResourceNotFoundError, null>
>;

@Injectable()
export class AddAttachmentToProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private attachmentRepository: AttachmentRepository,
  ) {}
  async execute({
    productId,
    attachmentIds,
  }: IAddAttachmentToProduct): ResponseAddAttachmentUseCase {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return left(new ResourceNotFoundError('Product not found'));
    }

    const attachmentsToAdd =
      await this.attachmentRepository.findByIds(attachmentIds);

    if (attachmentsToAdd.length === 0) {
      return left(
        new ResourceNotFoundError('No attachments found for the provided IDs'),
      );
    }

    const attachments = attachmentsToAdd.map((attachment) => attachment.id);

    await this.productRepository.addAttachmentToProduct({
      productId: product.id.toString(),
      attachmentIds: attachments,
    });

    return right(null);
  }
}
