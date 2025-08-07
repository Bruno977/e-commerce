import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AuthHttpModule } from './modules/auth/infra/http/http.module';
import { AuthModule } from './modules/auth/infra/auth/auth.module';
import { CategoryHttpModule } from './modules/category/infra/http/http.module';
import { ProductHttpModule } from './modules/product/infra/http/http.module';

@Module({
  imports: [AuthHttpModule, CategoryHttpModule, ProductHttpModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
