import { AddAttachmentToProductUseCase } from 'src/modules/product/application/use-cases/add-attachment-to-product.use-case';
import { AddAttachmentToProductDTO } from '../dto/add-attachment-to-product.dto';
import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  ValidationPipe,
} from '@nestjs/common';

import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/products/:productId/attachments')
@AuthRoles(UserRole.ADMIN)
@ApiTags('Product')
@ApiBearerAuth('jwt-auth')
export class AddAttachmentToProductController {
  constructor(
    private addAttachmentToProductUseCase: AddAttachmentToProductUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Add attachments to a product',
  })
  @ApiResponse({
    status: 204,
    description: 'Attachments added to product successfully',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid authentication token',
  })
  async handle(
    @Body(new ValidationPipe()) body: AddAttachmentToProductDTO,
    @Param('productId') productId: string,
  ) {
    const attachmentIds = body.attachmentIds;
    const result = await this.addAttachmentToProductUseCase.execute({
      attachmentIds,
      productId,
    });

    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
