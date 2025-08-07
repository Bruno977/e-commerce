import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value) as object;
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Validation failed',
        statusCode: 400,
        errors: this.formatErrors(errors),
      });
    }
    return value;
  }

  private toValidate(
    metatype: { new (...args: any[]): any } | ((...args: any[]) => any),
  ): boolean {
    const types: (new (...args: any[]) => any)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype as new (...args: any[]) => any);
  }

  private formatErrors(errors: ValidationError[]): any[] {
    return errors.map((error) => {
      const formattedError: {
        field: string;
        constraints: string | null;
        children?: any[];
      } = {
        field: error.property,
        constraints: error.constraints
          ? Object.values(error.constraints).join(', ')
          : null,
      };

      if (error.children && error.children.length > 0) {
        formattedError.children = this.formatErrors(error.children);
      }

      return formattedError;
    });
  }
}
