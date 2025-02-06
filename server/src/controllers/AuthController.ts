import express from "express"
import { AuthService } from "../services/auth/AuthService.ts"
import { authRegisterSchema, authLoginSchema } from "../schemas/auth/authSchema.ts"
import { ZodError } from "zod"

export class AuthController {
  static async register(request: express.Request, response: express.Response) {
    try {
      const validatedAuthData = authRegisterSchema.parse(request.body)
      const authService = new AuthService()
      const result = await authService.register(validatedAuthData)

      return response.status(201).json({
        message: "Usuário e conta criados com sucesso",
        data: result,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ error: error.errors })
      }

      if (error instanceof Error) {
        return response.status(500).json({ error: error.message })
      }
    }
  }

  static async login(request: express.Request, response: express.Response) {
    try {
      const validatedAuthData = authLoginSchema.parse(request.body)
      const authService = new AuthService()
      const result = await authService.login(validatedAuthData.email, validatedAuthData.password)

      return response.status(200).json({
        message: "Login realizado com sucesso",
        data: result,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ errors: error.errors })
      }

      if (error instanceof Error) {
        return response.status(500).json({ errors: error.message })
      }
    }
  }
}