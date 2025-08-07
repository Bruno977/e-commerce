import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { makeFakeCategory } from '../../test/factories/make-fake-category';
import { InMemoryCategoryRepository } from '../../test/repositories/in-memory-category.repository';
import { FindCategoryByIdUseCase } from './find-category-by-id.use-case';

let sut: FindCategoryByIdUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;
describe('FindCategoryByIdUseCase', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new FindCategoryByIdUseCase(inMemoryCategoryRepository);
  });
  it('should return a category when it exists', async () => {
    const category = makeFakeCategory();
    await inMemoryCategoryRepository.create(category);
    const result = await sut.execute(category.id.toString());
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({
      category,
    });
  });
  it("should return error when category doesn't exist", async () => {
    const result = await sut.execute('non-existing-id');
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
