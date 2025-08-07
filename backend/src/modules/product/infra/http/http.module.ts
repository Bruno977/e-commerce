import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateProductController } from './controllers/create-product.controller';
import { CreateProductUseCase } from '../../application/use-cases/create-product-use-case';
import { FindProductByIdController } from './controllers/find-product-by-id.controller';
import { FindProductByIdUseCase } from '../../application/use-cases/find-product-by-id.use-case';
import { UpdateProductDetailsController } from './controllers/update-product-details.controller';
import { UpdateProductDetailsUseCase } from '../../application/use-cases/update-product-details.use-case';
import { RemoveProductController } from './controllers/remove-product.controller';
import { RemoveProductUseCase } from '../../application/use-cases/remove-product.use-case';
import { FindAllProductsController } from './controllers/find-all-products.controller';
import { FindAllProductsUseCase } from '../../application/use-cases/find-all-products.use-case';
import { AddCategoryToProductController } from './controllers/add-category-to-product.controller';
import { AddCategoryToProductUseCase } from '../../application/use-cases/add-category-to-product.use-case';
import { RemoveCategoryFromProductController } from './controllers/remove-category-from-product.controller';
import { RemoveCategoryFromProductUseCase } from '../../application/use-cases/remove-category-from-product.use-case';
import { StorageModule } from '../storage/storage.module';
import { UploadAttachmentUseCase } from '../../application/use-cases/upload-attachment.use-case';
import { UploadAttachmentController } from './controllers/upload-attachment.controller';
import { RemoveAttachmentController } from './controllers/remove-attachment.controller';
import { RemoveAttachmentUseCase } from '../../application/use-cases/remove-attachment.use-case';
import { AddAttachmentToProductController } from './controllers/add-attachment-to-product.controller';
import { AddAttachmentToProductUseCase } from '../../application/use-cases/add-attachment-to-product.use-case';
import { RemoveAttachmentFromProductController } from './controllers/remove-attachment-from-product.controller';
import { RemoveAttachmentFromProductUseCase } from '../../application/use-cases/remove-attachment-from-product.use-case';

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [
    CreateProductController,
    FindProductByIdController,
    FindAllProductsController,
    UpdateProductDetailsController,
    RemoveProductController,
    AddCategoryToProductController,
    RemoveCategoryFromProductController,
    UploadAttachmentController,
    RemoveAttachmentController,
    AddAttachmentToProductController,
    RemoveAttachmentFromProductController,
  ],
  providers: [
    CreateProductUseCase,
    FindProductByIdUseCase,
    FindAllProductsUseCase,
    UpdateProductDetailsUseCase,
    RemoveProductUseCase,
    AddCategoryToProductUseCase,
    RemoveCategoryFromProductUseCase,
    UploadAttachmentUseCase,
    RemoveAttachmentUseCase,
    AddAttachmentToProductUseCase,
    RemoveAttachmentFromProductUseCase,
  ],
})
export class ProductHttpModule {}
