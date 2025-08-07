import { faker } from '@faker-js/faker';
import { Category, CategoryProps } from '../../domain/entities/category';
import { ICreateCategory } from '../../application/interfaces/create-category';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

export function makeFakeCategory(override: Partial<CategoryProps> = {}) {
  return Category.create({
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    productCount: faker.number.int({ min: 0, max: 100 }),
    ...override,
  });
}

export function makeFakeCategoryData(override: Partial<ICreateCategory> = {}) {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    isActive: faker.datatype.boolean(),
    role: UserRole.ADMIN,
    ...override,
  };
}
