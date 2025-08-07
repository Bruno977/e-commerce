import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/modules/category/application/use-cases/create-category.use-case';
import { CreateCategoryDTO } from '../dto/create-category.dto';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { ValidationPipe } from 'src/lib/common/infra/pipes/validation-pipe';

import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';
import { AuthRoles } from 'src/lib/common/infra/decorators/auth-roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/categories')
@ApiTags('Category')
@ApiBearerAuth('jwt-auth')
@AuthRoles(UserRole.ADMIN)
export class CreateCategoryController {
  constructor(private createCategory: CreateCategoryUseCase) {}
  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new category',
    description:
      'This endpoint allows an admin user to create a new category. The request must include a valid Authorization header with a Bearer token.',
  })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
  })
  @ApiResponse({ status: 409, description: 'Category already exists' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid authentication token',
  })
  async handle(@Body(new ValidationPipe()) body: CreateCategoryDTO) {
    const { title, description, isActive } = body;
    const result = await this.createCategory.execute({
      title,
      description,
      isActive,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
