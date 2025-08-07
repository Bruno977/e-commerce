import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { Public } from 'src/modules/auth/infra/auth/public';
import { FindCategoryByIdUseCase } from 'src/modules/category/application/use-cases/find-category-by-id.use-case';
import { CategoryPresenter } from '../presenters/category.presenter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/categories/:id')
@Public()
@ApiTags('Category')
export class FindCategoryByIdController {
  constructor(private findCategoryById: FindCategoryByIdUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Find a category by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Category found successfully',
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async handle(@Param('id') id: string) {
    const result = await this.findCategoryById.execute(id);
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
    return {
      category: CategoryPresenter.toHttp(result.value.category),
    };
  }
}
