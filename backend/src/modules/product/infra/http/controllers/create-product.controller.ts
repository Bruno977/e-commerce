import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { CreateProductControllerDTO } from '../dto/create-product.dto';
import { CreateProductUseCase } from 'src/modules/product/application/use-cases/create-product-use-case';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/products')
@AuthRoles(UserRole.ADMIN)
@ApiTags('Product')
@ApiBearerAuth('jwt-auth')
export class CreateProductController {
  constructor(private createProduct: CreateProductUseCase) {}
  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new product',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid authentication token',
  })
  async handle(@Body(new ValidationPipe()) body: CreateProductControllerDTO) {
    const result = await this.createProduct.execute(body);
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
