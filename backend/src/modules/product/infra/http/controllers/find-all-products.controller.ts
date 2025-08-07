import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { FindAllProductsUseCase } from 'src/modules/product/application/use-cases/find-all-products.use-case';
import { ProductPresenter } from '../presenters/product.presenter';
import { Public } from 'src/modules/auth/infra/auth/public';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllProductsDTO } from '../dto/find-all-products.dto';

@Controller('/products')
@Public()
@ApiTags('Product')
export class FindAllProductsController {
  constructor(private findAllProductsRepository: FindAllProductsUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Retrieve all products',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all products',
  })
  async handle(@Query() query: FindAllProductsDTO) {
    const result = await this.findAllProductsRepository.execute({
      page: query.page ? Number(query.page) : undefined,
      perPage: query.perPage ? Number(query.perPage) : undefined,
    });
    return {
      products: result.value?.products.map((product) =>
        ProductPresenter.toHttp(product),
      ),
      pagination: result.value?.pagination,
    };
  }
}
