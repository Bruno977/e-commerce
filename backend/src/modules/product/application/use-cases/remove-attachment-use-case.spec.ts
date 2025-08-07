import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';

import { InMemoryAttachmentRepository } from '../../test/repositories/in-memory-attachment.repository';
import { RemoveAttachmentUseCase } from './remove-attachment.use-case';
import { makeFakeAttachment } from '../../test/factories/make-fake-attachment';
import { FakeAttachmentStorage } from '../../test/storage/fake-attachment-storage';

let sut: RemoveAttachmentUseCase;
let fakeAttachmentStorage: FakeAttachmentStorage;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
describe('RemoveAttachmentUseCase', () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
    fakeAttachmentStorage = new FakeAttachmentStorage();
    sut = new RemoveAttachmentUseCase(
      inMemoryAttachmentRepository,
      fakeAttachmentStorage,
    );
  });
  it('should remove an attachment from a product', async () => {
    const attachment = makeFakeAttachment();
    await inMemoryAttachmentRepository.create(attachment);
    expect(inMemoryAttachmentRepository.attachments).toHaveLength(1);
    await sut.execute(attachment.id.toString());
    expect(inMemoryAttachmentRepository.attachments).toHaveLength(0);
  });
  it("should throw if attachment doesn't exist", async () => {
    const result = await sut.execute('non-existing-attachment-id');
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
