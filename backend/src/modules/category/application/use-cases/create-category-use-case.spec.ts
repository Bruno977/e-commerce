import { InMemoryCategoryRepository } from '../../test/repositories/in-memory-category.repository';
import { CreateCategoryUseCase } from './create-category.use-case';
import { makeFakeCategoryData } from '../../test/factories/make-fake-category';
import { ResourceAlreadyExistsError } from 'src/lib/common/errors/resource-already-exists.error';

let sut: CreateCategoryUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;
describe('CreateCategoryUseCase', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new CreateCategoryUseCase(inMemoryCategoryRepository);
  });
  it('should create a category', async () => {
    const response = await sut.execute(
      makeFakeCategoryData({
        title: 'category-1',
      }),
    );

    expect(response.isRight()).toBe(true);
    const category = inMemoryCategoryRepository.categories[0];
    expect(category.slug.getValue()).toBe('category-1');
  });
  it('should not create a category if already exist', async () => {
    await sut.execute(
      makeFakeCategoryData({
        title: 'Category 1',
      }),
    );
    const result = await sut.execute(
      makeFakeCategoryData({
        title: 'Category 1',
      }),
    );

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError);
  });
});
