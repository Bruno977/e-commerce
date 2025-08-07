import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { RemoveProductUseCase } from 'src/modules/product/application/use-cases/remove-product.use-case';

@Controller('/products/:id')
@AuthRoles(UserRole.ADMIN)
@ApiTags('Product')
@ApiBearerAuth('jwt-auth')
export class RemoveProductController {
  constructor(private removeProductRepository: RemoveProductUseCase) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove a product',
  })
  @ApiResponse({
    status: 204,
    description: 'Product removed successfully',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid authentication token',
  })
  async handle(@Param('id') id: string) {
    const result = await this.removeProductRepository.execute(id);
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
