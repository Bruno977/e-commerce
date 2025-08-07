import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { Public } from 'src/modules/auth/infra/auth/public';
import { FindProductByIdUseCase } from 'src/modules/product/application/use-cases/find-product-by-id.use-case';
import { ProductPresenter } from '../presenters/product.presenter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/products/:id')
@Public()
@ApiTags('Product')
export class FindProductByIdController {
  constructor(private findByIdUseCase: FindProductByIdUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Retrieve a product by ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async handle(@Param('id') id: string) {
    const result = await this.findByIdUseCase.execute(id);
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
    return ProductPresenter.toHttp(result.value.product);
  }
}
