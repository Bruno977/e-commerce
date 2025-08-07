import { makeFakeCategory } from '../../test/factories/make-fake-category';
import { InMemoryCategoryRepository } from '../../test/repositories/in-memory-category.repository';
import { FindAllCategoriesUseCase } from './find-all-categories.use-case';

let sut: FindAllCategoriesUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;

describe('FindAllCategoriesUseCase', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new FindAllCategoriesUseCase(inMemoryCategoryRepository);
  });
  it('should be able to find all categories', async () => {
    await inMemoryCategoryRepository.create(makeFakeCategory());
    await inMemoryCategoryRepository.create(makeFakeCategory());
    await inMemoryCategoryRepository.create(makeFakeCategory());
    await inMemoryCategoryRepository.create(makeFakeCategory());

    const result = await sut.execute({
      page: 1,
    });
    expect(result.value?.categories).toHaveLength(4);
  });
  it('should be able to find all categories with pagination', async () => {
    for (let i = 0; i < 50; i++) {
      await inMemoryCategoryRepository.create(makeFakeCategory());
    }

    const result = await sut.execute({
      page: 2,
    });
    expect(result.value?.categories).toHaveLength(20);
    expect(result.value?.pagination.totalItems).toBe(50);
    expect(result.value?.pagination.currentPage).toBe(2);
    expect(result.value?.pagination.perPage).toBe(20);
    expect(result.value?.pagination.totalPages).toBe(3);
  });
});
