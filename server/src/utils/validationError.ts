import { ZodError } from "zod"

export class ValidationError extends Error {
  public errors: any

  constructor(errors: ZodError) {
    super("Erro de validação")
    this.name = "ValidationError"
    this.errors = errors.format()
  }
}