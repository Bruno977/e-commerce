import { makeFakeCategory } from 'src/modules/category/test/factories/make-fake-category';
import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { InMemoryCategoryRepository } from '../../../category/test/repositories/in-memory-category.repository';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { RemoveCategoryFromProductUseCase } from './remove-category-from-product.use-case';

let sut: RemoveCategoryFromProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryCategoryRepository: InMemoryCategoryRepository;
describe('RemoveCategoryFromProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new RemoveCategoryFromProductUseCase(
      inMemoryProductRepository,
      inMemoryCategoryRepository,
    );
  });
  it('should remove a category from a product', async () => {
    const category = makeFakeCategory();
    const product = makeFakeProduct({
      categoryIds: [category.id],
    });
    await inMemoryCategoryRepository.create(category);
    await inMemoryProductRepository.create(product);

    const productItem = inMemoryProductRepository.products[0];

    expect(productItem.categoryIds[0].toString()).toBe(category.id.toString());
    expect(productItem.categoryIds.length).toBe(1);

    await sut.execute({
      productId: product.id.toString(),
      categoryIds: [category.id.toString()],
    });
    const updatedProduct = inMemoryProductRepository.products[0];
    expect(updatedProduct.categoryIds.length).toBe(0);
  });
  it("should throw an error if the product doesn't exist", async () => {
    const category = makeFakeCategory();

    await inMemoryCategoryRepository.create(category);

    const result = await sut.execute({
      productId: 'invalid-product-id',
      categoryIds: [category.id.toString()],
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
  it("should throw an error if the category doesn't exist", async () => {
    const product = makeFakeProduct();

    await inMemoryProductRepository.create(product);

    const result = await sut.execute({
      productId: product.id.toString(),
      categoryIds: ['invalid-category-id'],
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
