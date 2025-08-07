import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { RemoveAttachmentUseCase } from 'src/modules/product/application/use-cases/remove-attachment.use-case';

@Controller('/files/:attachmentId')
@AuthRoles(UserRole.ADMIN)
@ApiTags('Product')
@ApiBearerAuth('jwt-auth')
export class RemoveAttachmentController {
  constructor(private removeAttachment: RemoveAttachmentUseCase) {}
  @Delete()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove an attachment',
  })
  @ApiResponse({
    status: 204,
    description: 'Attachment removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Attachment not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid authentication token',
  })
  async handle(@Param('attachmentId') attachmentId: string) {
    const result = await this.removeAttachment.execute(attachmentId);
    if (result.isLeft()) {
      throw result.value;
    }
  }
}
