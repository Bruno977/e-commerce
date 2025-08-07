import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { makeFakeCategory } from '../../test/factories/make-fake-category';
import { InMemoryCategoryRepository } from '../../test/repositories/in-memory-category.repository';
import { FindCategoryBySlugUseCase } from './find-category-by-slug.use-case';

let sut: FindCategoryBySlugUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;
describe('FindCategoryBySlugUseCase', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new FindCategoryBySlugUseCase(inMemoryCategoryRepository);
  });
  it('should return a category when it exists', async () => {
    const category = makeFakeCategory();
    await inMemoryCategoryRepository.create(category);
    const result = await sut.execute(category.slug.getValue());
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({
      category,
    });
  });
  it("should return error when category doesn't exist", async () => {
    const result = await sut.execute('non-existing-slug');
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
