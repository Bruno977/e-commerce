import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Id } from 'src/lib/common/entities/id';
import { AttachmentRepository } from '../../domain/repositories/attachment.repository';
import { IRemoveAttachmentFromProduct } from '../interfaces/remove-attachment-from-product';
import { Injectable } from '@nestjs/common';

type ResponseRemoveAttachmentFromProduct = Promise<
  Either<ResourceNotFoundError, null>
>;

@Injectable()
export class RemoveAttachmentFromProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private attachmentRepository: AttachmentRepository,
  ) {}

  async execute({
    productId,
    attachmentIds,
  }: IRemoveAttachmentFromProduct): ResponseRemoveAttachmentFromProduct {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return left(new ResourceNotFoundError(`Product not found`));
    }

    const attachmentsToRemove =
      await this.attachmentRepository.findByIds(attachmentIds);

    if (attachmentsToRemove.length === 0) {
      return left(
        new ResourceNotFoundError('No attachments found for the provided IDs'),
      );
    }

    const attachments = attachmentIds.map((attachmentId) =>
      Id.create(attachmentId.toString()),
    );

    await this.productRepository.removeAttachmentFromProduct({
      productId: product.id.toString(),
      attachmentIds: attachments,
    });

    return right(null);
  }
}
