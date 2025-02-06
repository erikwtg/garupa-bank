import express from "express"
import { ZodError } from "zod"
import { AccountFactory } from "../factories/AccountFactory.ts"
import { getAccountSchema } from "../schemas/account/getAccountSchema.ts"

export class AccountController {
  static async getById(request: express.Request, response: express.Response) {
    try{
      const validatedData = getAccountSchema.parse(request.params)

      const accountService = AccountFactory.getInstance()
      const accountById = await accountService.getById(validatedData.id)

      if (!accountById) {
        throw new Error("Conta não encontrada")
      }

      return response.status(200).json(accountById)
    } catch(error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ errors: error.errors })
      } 

      if (error instanceof Error) {
        return response.status(500).json({ errors: error.message })
      }
    }
  }

  static async getByUserId(request: express.Request, response: express.Response) {
    try{
      const validatedData = getAccountSchema.parse(request.params)

      const accountService = AccountFactory.getInstance()
      const accountsByUserId = await accountService.findAccountsByUserId(validatedData.id)

      if (!accountsByUserId) {
        throw new Error("Conta não encontrada")
      }

      return response.status(200).json(accountsByUserId)
    } catch(error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ errors: error.errors })
      } 

      if (error instanceof Error) {
        return response.status(500).json({ errors: error.message })
      }
    }
  }
}