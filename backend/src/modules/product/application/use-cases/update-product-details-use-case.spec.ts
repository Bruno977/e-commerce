import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { UpdateProductDetailsUseCase } from './update-product-details.use-case';
import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { Price } from '../../domain/value-objects/price';

let sut: UpdateProductDetailsUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
describe('UpdateProductDetailsUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new UpdateProductDetailsUseCase(inMemoryProductRepository);
  });
  it('should be able to update a product details', async () => {
    const newProduct = makeFakeProduct();
    await inMemoryProductRepository.create(newProduct);
    const result = await sut.execute({
      id: newProduct.id.toString(),
      name: 'updated name',
      description: 'updated description',
      price: 100,
      discount: 10,
      stock: 10,
    });
    expect(result.isRight()).toBeTruthy();
    const productUpdated = inMemoryProductRepository.products[0];
    expect(productUpdated.name).toBe('updated name');
    expect(productUpdated.description).toBe('updated description');
    expect(productUpdated.originalPrice).toBe(100);
    expect(productUpdated.currentPrice).toBe(90);
    expect(productUpdated.discount).toBe(10);
    expect(productUpdated.getStock).toBe(10);
  });
  it('should be able to update a product price with discount', async () => {
    const newProduct = makeFakeProduct({
      price: Price.createWithDiscount(200, 10),
    });
    await inMemoryProductRepository.create(newProduct);
    const result = await sut.execute({
      id: newProduct.id.toString(),
    });
    expect(result.isRight()).toBeTruthy();
    const productUpdated = inMemoryProductRepository.products[0];
    expect(productUpdated.originalPrice).toBe(200);
    expect(productUpdated.currentPrice).toBe(180);
    expect(productUpdated.discount).toBe(10);
  });
  it("should not be able to update a product if it doesn't exist", async () => {
    const result = await sut.execute({
      id: 'non-existing-id',
    });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
