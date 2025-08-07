import { makeFakeProduct } from '../../test/factories/make-fake-product';
import { InMemoryProductRepository } from '../../test/repositories/in-memory-product-repository';
import { RemoveProductUseCase } from './remove-product.use-case';

let sut: RemoveProductUseCase;
let inMemoryProductRepository: InMemoryProductRepository;

describe('RemoveProductUseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new RemoveProductUseCase(inMemoryProductRepository);
  });

  it('should be able to remove a product', async () => {
    const product = makeFakeProduct();
    await inMemoryProductRepository.create(product);
    const result = await sut.execute(product.id.toString());
    expect(result.isRight()).toBeTruthy();
    expect(inMemoryProductRepository.products).toHaveLength(0);
  });

  it("should not be able to remove a product if it doesn't exist", async () => {
    const result = await sut.execute('non-existing-id');
    expect(result.isLeft()).toBeTruthy();
  });
});
