import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { RemoveAttachmentFromProductUseCase } from './remove-attachment-from-product.use-case';
import { InMemoryAttachmentRepository } from '../../test/repositories/in-memory-attachment.repository';
import { makeFakeAttachment } from '../../test/factories/make-fake-attachment';

let sut: RemoveAttachmentFromProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;

describe('RemoveAttachmentFromProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    sut = new RemoveAttachmentFromProductUseCase(
      inMemoryProductRepository,
      inMemoryAttachmentRepository,
    );
  });
  it('should remove an attachment from a product', async () => {
    const attachment = makeFakeAttachment();
    const attachment2 = makeFakeAttachment();
    await inMemoryAttachmentRepository.create(attachment);
    await inMemoryAttachmentRepository.create(attachment2);
    const newProduct = makeFakeProduct({
      attachmentIds: [attachment.id, attachment2.id],
    });
    await inMemoryProductRepository.create(newProduct);

    expect(inMemoryProductRepository.products[0].attachmentIds).toHaveLength(2);

    await sut.execute({
      productId: newProduct.id.toString(),
      attachmentIds: [attachment.id.toString()],
    });

    expect(inMemoryProductRepository.products[0].attachmentIds).toHaveLength(1);
    expect(
      inMemoryProductRepository.products[0].attachmentIds[0].toString(),
    ).toBe(attachment2.id.toString());
  });
  it("should throw if product doesn't exist", async () => {
    const result = await sut.execute({
      productId: 'non-existing-product-id',
      attachmentIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
  it('should remove multiple attachments from a product', async () => {
    const attachment1 = makeFakeAttachment();
    const attachment2 = makeFakeAttachment();
    const attachment3 = makeFakeAttachment();
    await inMemoryAttachmentRepository.create(attachment1);
    await inMemoryAttachmentRepository.create(attachment2);
    await inMemoryAttachmentRepository.create(attachment3);

    const newProduct = makeFakeProduct({
      attachmentIds: [attachment1.id, attachment2.id, attachment3.id],
    });
    await inMemoryProductRepository.create(newProduct);

    expect(inMemoryProductRepository.products[0].attachmentIds).toHaveLength(3);

    await sut.execute({
      productId: newProduct.id.toString(),
      attachmentIds: [attachment1.id.toString(), attachment2.id.toString()],
    });

    expect(inMemoryProductRepository.products[0].attachmentIds).toHaveLength(1);
    expect(
      inMemoryProductRepository.products[0].attachmentIds[0].toString(),
    ).toBe(attachment3.id.toString());
  });
  it('should throw if attachment to remove does not exist', async () => {
    const newProduct = makeFakeProduct();
    await inMemoryProductRepository.create(newProduct);

    const result = await sut.execute({
      productId: newProduct.id.toString(),
      attachmentIds: ['id-not-existing'],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
