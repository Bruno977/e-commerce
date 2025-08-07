export class NotFoundError extends Error {
  constructor(message: string = "Não encontrado") {
    super(message);
    this.name = "NotFoundError";
  }
}
