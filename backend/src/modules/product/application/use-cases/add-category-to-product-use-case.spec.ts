import { InMemoryCategoryRepository } from '../../../category/test/repositories/in-memory-category.repository';
import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { AddCategoryToProductUseCase } from './add-category-to-product.use-case';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';

let sut: AddCategoryToProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryCategoryRepository: InMemoryCategoryRepository;

describe('AddCategoryToProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new AddCategoryToProductUseCase(
      inMemoryProductRepository,
      inMemoryCategoryRepository,
    );
  });

  it('should be able to add new category in use case', async () => {
    const newCategory = makeFakeCategory();
    await inMemoryCategoryRepository.create(newCategory);

    const newProduct = makeFakeProduct({
      categoryIds: [newCategory.id],
    });

    await inMemoryProductRepository.create(newProduct);

    const newCategory3 = makeFakeCategory();

    await inMemoryCategoryRepository.create(newCategory3);

    await sut.execute({
      productId: newProduct.id.toString(),
      categoryIds: [newCategory3.id.toString()],
    });
    const product = inMemoryProductRepository.products[0];
    expect(product.categoryIds).toHaveLength(2);
  });
  it("should not be able to add a category to a product that doesn't exist", async () => {
    const newCategory = makeFakeCategory();
    await inMemoryCategoryRepository.create(newCategory);

    const result = await sut.execute({
      productId: 'non-existing-product-id',
      categoryIds: [newCategory.id.toString()],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
  it("should not be able to add a category that doesn't exist", async () => {
    const newProduct = makeFakeProduct();
    await inMemoryProductRepository.create(newProduct);

    const result = await sut.execute({
      productId: newProduct.id.toString(),
      categoryIds: ['non-existing-category-id'],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
