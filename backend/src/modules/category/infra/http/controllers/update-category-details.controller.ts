import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { UpdateCategoryDetailsUseCase } from 'src/modules/category/application/use-cases/update-category-details.use-case';
import { UpdateCategoryDTO } from '../dto/update-category.dto';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/categories/:id')
@AuthRoles(UserRole.ADMIN)
@ApiTags('Category')
@ApiBearerAuth('jwt-auth')
export class UpdateCategoryDetailsController {
  constructor(private updateCategoryDetails: UpdateCategoryDetailsUseCase) {}
  @Put()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Update Category Details',
  })
  @ApiResponse({
    status: 204,
    description: 'Category  updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid authentication token',
  })
  async handle(
    @Body(new ValidationPipe()) body: UpdateCategoryDTO,
    @Param('id') id: string,
  ) {
    const { description, isActive, title } = body;

    const result = await this.updateCategoryDetails.execute({
      id: id,
      description,
      isActive,
      title,
    });

    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
