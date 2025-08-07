import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { FindAllProductsUseCase } from './find-all-products.use-case';
let sut: FindAllProductsUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('FindAllProductsUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FindAllProductsUseCase(inMemoryProductRepository);
  });
  it('should be able to find all products', async () => {
    await inMemoryProductRepository.create(makeFakeProduct());
    await inMemoryProductRepository.create(makeFakeProduct());
    await inMemoryProductRepository.create(makeFakeProduct());
    await inMemoryProductRepository.create(makeFakeProduct());

    const products = await sut.execute({
      page: 1,
      perPage: 20,
    });
    expect(products.value?.products).toHaveLength(4);
  });
  it('should return an empty array if no products are found', async () => {
    const products = await sut.execute({
      page: 1,
      perPage: 20,
    });
    expect(products.value?.products).toHaveLength(0);
  });
  it('should return paginated products', async () => {
    for (let i = 0; i < 50; i++) {
      await inMemoryProductRepository.create(makeFakeProduct());
    }
    const result = await sut.execute({
      page: 2,
      perPage: 20,
    });
    expect(result.value?.products).toHaveLength(20);
    expect(result.value?.pagination.totalItems).toBe(50);
    expect(result.value?.pagination.currentPage).toBe(2);
    expect(result.value?.pagination.perPage).toBe(20);
    expect(result.value?.pagination.totalPages).toBe(3);
  });
});
