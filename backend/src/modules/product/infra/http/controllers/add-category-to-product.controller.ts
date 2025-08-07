import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { AddCategoryToProductUseCase } from 'src/modules/product/application/use-cases/add-category-to-product.use-case';
import { AddCategoryToProductDTO } from '../dto/add-category-to-product.dto';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/products/:productId/categories')
@AuthRoles(UserRole.ADMIN)
@ApiTags('Product')
@ApiBearerAuth('jwt-auth')
export class AddCategoryToProductController {
  constructor(
    private addCategoryToProductRepository: AddCategoryToProductUseCase,
  ) {}

  @Patch()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Add categories to a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Categories added to product successfully',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid authentication token',
  })
  async handle(
    @Body(new ValidationPipe()) body: AddCategoryToProductDTO,
    @Param('productId') productId: string,
  ) {
    const result = await this.addCategoryToProductRepository.execute({
      productId,
      categoryIds: body.categoryIds,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
