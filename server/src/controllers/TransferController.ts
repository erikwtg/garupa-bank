import express from "express"
import { ZodError } from "zod"
import { TransferEntity } from "../entities/TransferEntity.ts"
import { TransferFactory } from "../factories/TransferFactory.ts"

import { createTransferSchema } from "../schemas/createTransferSchema.ts"
import { getTransferSchema } from "../schemas/getTransferSchema.ts"

export class TransferController {
  static async create(request: express.Request, response: express.Response) {
    try{
      const validatedData = createTransferSchema.parse(request.body)

      let newTransfer = new TransferEntity(validatedData)

      const transferService = TransferFactory.getInstance()

      transferService.create(newTransfer)

      response.status(201).json({ message: "Transferência criada com sucesso!" })
    } catch(error) {
      if (error instanceof ZodError) {
        response.status(400).json({ error: error.errors })
      }

      if (error instanceof Error) {
        response.status(500).json({ error: error.message })
      }
    }
  }

  static async getAll(request: Request, response: Response) {
    try{
      const transferService = TransferFactory.getInstance()
  
      const allTransfers = await transferService.getAll()
  
      response.status(200).json(allTransfers)
    } catch(error) {
      if (error instanceof ZodError) {
        response.status(400).json({ error: error.errors })
      } 
  
      if (error instanceof Error) {
        response.status(500).json({ error: error.message })
      }
    }
  }

  static async getById(request: Request, response: Response) {
    try{
      const validatedData = getTransferSchema.parse(request.params)

      const transferService = TransferFactory.getInstance()

      const transferById = await transferService.getById(validatedData.id)

      if (!transferById) {
        throw new Error("Transferência não encontrada");
      }

      response.status(200).json(transferById)
    } catch(error) {
      if (error instanceof ZodError) {
        response.status(400).json({ error: error.errors })
      } 

      if (error instanceof Error) {
        response.status(500).json({ error: error.message })
      }
    }
  }
}