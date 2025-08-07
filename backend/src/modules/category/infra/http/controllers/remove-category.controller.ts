import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { RemoveCategoryUseCase } from 'src/modules/category/application/use-cases/remove-category.use-case';

@Controller('/categories/:id')
@ApiTags('Category')
@ApiBearerAuth('jwt-auth')
export class RemoveCategoryController {
  constructor(private removeCategory: RemoveCategoryUseCase) {}
  @Delete()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove a category by ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Category removed successfully',
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid authentication token',
  })
  async handle(@Param('id') id: string) {
    const result = await this.removeCategory.execute({
      categoryId: id,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
