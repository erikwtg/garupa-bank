import express from "express"
import { AuthService } from "../services/auth/AuthService.ts"
import { authRegisterSchema } from "../schemas/auth/authRegisterSchema.ts"
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
        console.log(error)
        return response.status(500).json({ error: error.message })
      }
    }
  }

  static async login(request: express.Request, response: express.Response) {
    try {
      const { email, password } = request.body
      const authService = new AuthService()
      const result = await authService.login(email, password)

      return response.status(200).json({
        message: "Login realizado com sucesso",
        data: result,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ error: error.errors })
      }

      if (error instanceof Error) {
        console.log(error)
        return response.status(500).json({ error: error.message })
      }
    }
  }
}