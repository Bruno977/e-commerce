import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { RemoveAttachmentFromProductUseCase } from 'src/modules/product/application/use-cases/remove-attachment-from-product.use-case';
import { RemoveAttachmentFromProductDTO } from '../dto/remove-attachment-from-product.dto';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/products/:productId/attachments/remove')
@AuthRoles(UserRole.ADMIN)
@ApiTags('Product')
@ApiBearerAuth('jwt-auth')
export class RemoveAttachmentFromProductController {
  constructor(
    private removeAttachmentFromProduct: RemoveAttachmentFromProductUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove attachments from a product',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid authentication token',
  })
  async handle(
    @Body(new ValidationPipe())
    { attachmentIds }: RemoveAttachmentFromProductDTO,
    @Param('productId') productId: string,
  ) {
    const result = await this.removeAttachmentFromProduct.execute({
      attachmentIds,
      productId,
    });

    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
