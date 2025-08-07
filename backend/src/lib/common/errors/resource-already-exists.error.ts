import { AppError } from './app-error';

export class ResourceAlreadyExistsError extends AppError {
  constructor(message: string) {
    super(message);
  }
}
