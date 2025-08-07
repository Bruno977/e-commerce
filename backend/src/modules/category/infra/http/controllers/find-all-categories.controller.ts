import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { FindAllCategoriesUseCase } from 'src/modules/category/application/use-cases/find-all-categories.use-case';
import { CategoryPresenter } from '../presenters/category.presenter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/infra/auth/public';
import { FindAllCategoriesDTO } from '../dto/find-all-categories.dto';

@Controller('categories')
@Public()
@ApiTags('Category')
export class FindAllCategoriesController {
  constructor(private findAllCategories: FindAllCategoriesUseCase) {}
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Find all categories',
  })
  async handle(@Query() query: FindAllCategoriesDTO) {
    const result = await this.findAllCategories.execute({
      page: query.page ? Number(query.page) : undefined,
      perPage: query.perPage ? Number(query.perPage) : undefined,
    });
    return {
      categories: result.value?.categories.map((category) =>
        CategoryPresenter.toHttp(category),
      ),
      pagination: result.value?.pagination,
    };
  }
}
