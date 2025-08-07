export class UnexpectedError extends Error {
  constructor(
    message: string = "Ocorreu um erro inesperado. Tente novamente mais tarde."
  ) {
    super(message);
    this.name = "UnexpectedError";
  }
}
