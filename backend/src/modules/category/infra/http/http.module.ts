import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { DatabaseModule } from '../database/database.module';
import { CreateCategoryController } from './controllers/create-category.controller';
import { FindCategoryByIdController } from './controllers/find-category-by-id.controller';
import { FindCategoryByIdUseCase } from '../../application/use-cases/find-category-by-id.use-case';
import { FindCategoryBySlugController } from './controllers/find-category-by-slug.controller';
import { FindCategoryBySlugUseCase } from '../../application/use-cases/find-category-by-slug.use-case';
import { RemoveCategoryUseCase } from '../../application/use-cases/remove-category.use-case';
import { UpdateCategoryDetailsController } from './controllers/update-category-details.controller';
import { UpdateCategoryDetailsUseCase } from '../../application/use-cases/update-category-details.use-case';
import { RemoveCategoryController } from './controllers/remove-category.controller';
import { FindAllCategoriesController } from './controllers/find-all-categories.controller';
import { FindAllCategoriesUseCase } from '../../application/use-cases/find-all-categories.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCategoryController,
    FindCategoryByIdController,
    FindCategoryBySlugController,
    RemoveCategoryController,
    UpdateCategoryDetailsController,
    FindAllCategoriesController,
  ],
  providers: [
    CreateCategoryUseCase,
    FindCategoryByIdUseCase,
    FindCategoryBySlugUseCase,
    RemoveCategoryUseCase,
    UpdateCategoryDetailsUseCase,
    FindAllCategoriesUseCase,
  ],
})
export class CategoryHttpModule {}
