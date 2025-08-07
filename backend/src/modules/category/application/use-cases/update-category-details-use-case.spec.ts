import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { makeFakeCategory } from '../../test/factories/make-fake-category';
import { InMemoryCategoryRepository } from '../../test/repositories/in-memory-category.repository';
import { UpdateCategoryDetailsUseCase } from './update-category-details.use-case';
let sut: UpdateCategoryDetailsUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;
describe('UpdateCategoryDetailsUseCase', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new UpdateCategoryDetailsUseCase(inMemoryCategoryRepository);
  });
  it("should be able to update a category's details", async () => {
    const newCategory = makeFakeCategory();
    await inMemoryCategoryRepository.create(newCategory);

    const oldCategory = inMemoryCategoryRepository.categories[0];
    expect(oldCategory.description).toBe(newCategory.description);
    expect(oldCategory.title).toBe(newCategory.title);
    expect(oldCategory.isActive).toBe(newCategory.isActive);
    expect(oldCategory.slug.getValue()).toBe(newCategory.slug.getValue());

    await sut.execute({
      id: newCategory.id.toString(),
      title: 'Updated Title',
      description: 'Updated Description',
      isActive: false,
    });

    const updatedCategory = inMemoryCategoryRepository.categories[0];
    expect(updatedCategory.description).toBe('Updated Description');
    expect(updatedCategory.title).toBe('Updated Title');
    expect(updatedCategory.isActive).toBe(false);
    expect(updatedCategory.slug.getValue()).toBe('updated-title');
  });
  it("should not be able to update a category's details if it does not exist", async () => {
    const result = await sut.execute({
      id: 'non-existing-id',
      title: 'Updated Title',
      description: 'Updated Description',
      isActive: false,
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
