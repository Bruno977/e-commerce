import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { AddAttachmentToProductUseCase } from './add-attachment-to-product.use-case';
import { InMemoryAttachmentRepository } from '../../test/repositories/in-memory-attachment.repository';
import { makeFakeAttachment } from '../../test/factories/make-fake-attachment';

let sut: AddAttachmentToProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;

describe('AddAttachmentToProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    sut = new AddAttachmentToProductUseCase(
      inMemoryProductRepository,
      inMemoryAttachmentRepository,
    );
  });
  it('should be able to add an attachment to a product', async () => {
    const newProduct = makeFakeProduct({
      attachmentIds: [],
    });
    const newAttachment = makeFakeAttachment();
    const newAttachment2 = makeFakeAttachment();
    await inMemoryProductRepository.create(newProduct);
    await inMemoryAttachmentRepository.create(newAttachment);
    await inMemoryAttachmentRepository.create(newAttachment2);
    await sut.execute({
      productId: newProduct.id.toString(),
      attachmentIds: [
        newAttachment.id.toString(),
        newAttachment2.id.toString(),
      ],
    });
    const product = inMemoryProductRepository.products[0];
    expect(product.attachmentIds).toHaveLength(2);
  });

  it('should not be able to add an attachment to a product that does not exist', async () => {
    const result = await sut.execute({
      productId: 'non-existing-product-id',
      attachmentIds: ['non-existing-attachment-id'],
    });
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
  it("should not be able to add an attachment to a product if the attachment doesn't exist", async () => {
    const newProduct = makeFakeProduct();
    await inMemoryProductRepository.create(newProduct);
    const result = await sut.execute({
      productId: newProduct.id.toString(),
      attachmentIds: ['non-existing-attachment-id'],
    });
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
