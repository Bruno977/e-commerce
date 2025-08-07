import { InMemoryProductRepository } from '../../../product/test/repositories/in-memory-product-repository';
import { InMemoryCategoryRepository } from '../../test/repositories/in-memory-category.repository';
import { RemoveCategoryUseCase } from './remove-category.use-case';
import { makeFakeCategory } from '../../test/factories/make-fake-category';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { makeFakeProduct } from 'src/modules/product/test/factories/make-fake-product';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';

let sut: RemoveCategoryUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;
let inMemoryProductRepository: InMemoryProductRepository;
describe('RemoveCategoryUseCase', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new RemoveCategoryUseCase(
      inMemoryCategoryRepository,
      inMemoryProductRepository,
    );
  });
  it('should remove a category', async () => {
    const newCategory = makeFakeCategory();
    await inMemoryCategoryRepository.create(newCategory);

    const result = await sut.execute({
      categoryId: newCategory.id.toString(),
    });
    expect(result.isRight()).toBeTruthy();
  });
  it("should return ResourceNotFoundError if category doesn't exist", async () => {
    const result = await sut.execute({
      categoryId: 'non-existing-category-id',
    });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
  it('should return NotAllowedError if category has products', async () => {
    const newCategory = makeFakeCategory();
    await inMemoryCategoryRepository.create(newCategory);

    const newProduct = makeFakeProduct({
      categoryIds: [newCategory.id],
    });
    await inMemoryProductRepository.create(newProduct);

    const result = await sut.execute({
      categoryId: newCategory.id.toString(),
    });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
