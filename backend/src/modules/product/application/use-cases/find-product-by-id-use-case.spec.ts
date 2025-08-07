import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { FindProductByIdUseCase } from './find-product-by-id.use-case';

let sut: FindProductByIdUseCase;
let inMemoryProductRepository: InMemoryProductRepository;
describe('FindProductByIdUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FindProductByIdUseCase(inMemoryProductRepository);
  });
  it('should be able to find a product by id', async () => {
    const product = makeFakeProduct();
    await inMemoryProductRepository.create(product);
    const result = await sut.execute(product.id.toString());
    expect(result.isRight()).toBeTruthy();
    const productCreated = inMemoryProductRepository.products[0];
    expect(productCreated.name).toBe(product.name);
  });
  it("should not be able to find a product by id if it doesn't exist", async () => {
    const result = await sut.execute('non-existing-id');
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
