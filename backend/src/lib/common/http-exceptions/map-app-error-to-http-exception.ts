import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { AppError } from '../errors/app-error';
import { NotAllowedError } from '../errors/not-allowed.error';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists.error';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';
import { InvalidValueError } from '../errors/invalid-value-error';

export function mapAppErrorToHttpException(error: AppError) {
  if (error instanceof NotAllowedError) {
    return new UnauthorizedException(error.message);
  }

  if (error instanceof ResourceAlreadyExistsError) {
    return new ConflictException(error.message);
  }
  if (error instanceof ResourceNotFoundError) {
    return new NotFoundException(error.message);
  }
  if (error instanceof InvalidValueError) {
    return new UnsupportedMediaTypeException(error.message);
  }

  return new BadRequestException(error.message);
}
