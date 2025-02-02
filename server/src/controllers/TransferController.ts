import express from "express"
import { ZodError } from "zod"
import { TransferEntity } from "../entities/TransferEntity.ts"
import { TransferFactory } from "../factories/TransferFactory.ts"

import { OrderIntegrationService } from "../services/order/OrderIntegrationService.ts"
import { OrderIntegrationServiceDTO } from "../services/order/OrderIntegrationServiceDTO.ts"

import { createTransferSchema } from "../schemas/transfer/createTransferSchema.ts"
import { getTransferSchema } from "../schemas/transfer/getTransferSchema.ts"

import { TRANSACTION_STATUS } from "../constants/transactionStatus.ts"

export class TransferController {
  static async create(request: express.Request, response: express.Response) {
    try{
      const validatedData = createTransferSchema.parse(request.body)
      let newTransfer = new TransferEntity(validatedData)

      const dateNow = new Date()

      const dueDate = newTransfer?.dueDate ? new Date(newTransfer.dueDate) : null
      if (dueDate && dueDate < dateNow) {
        return response.status(400).json({ error: "Não pode ser efetuado após a data de vencimento." })
      }

      const scheduled = newTransfer?.expectedOn
      if (scheduled) {
        Object.assign(newTransfer, { status: TRANSACTION_STATUS.SCHEDULED })
      }

      const transferService = TransferFactory.getInstance()
      const createdTransfer = await transferService.create(newTransfer)

      if (!createdTransfer || createdTransfer.length === 0) {
        return response.status(500).json({ error: "Erro ao criar a transferência." })
      }

      if (!scheduled) {
        let newOrder = new OrderIntegrationServiceDTO(newTransfer)
        const orderIntegrationService = new OrderIntegrationService

        const sendedOrder = await orderIntegrationService.sendOrder(newOrder)

        const status = sendedOrder ? TRANSACTION_STATUS.CONFIRMED : TRANSACTION_STATUS.PROCESSING

        // Todo[Erik] - Refatorar validação para UPDATE da transação
        await transferService.update(createdTransfer[0].id, { status })
      }

      return response.status(201).json({ message: "Transferência efetuada com sucesso!" })
    } catch(error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ error: error.errors })
      }

      if (error instanceof Error) {
        console.log(error)
        return response.status(500).json({ error: error.message })
      }
    }
  }

  static async getAll(request: express.Request, response: express.Response) {
    try{
      const transferService = TransferFactory.getInstance()
  
      const allTransfers = await transferService.getAll()
  
      return response.status(200).json(allTransfers)
    } catch(error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ error: error.errors })
      } 
  
      if (error instanceof Error) {
        return response.status(500).json({ error: error.message })
      }
    }
  }

  static async getById(request: express.Request, response: express.Response) {
    try{
      const validatedData = getTransferSchema.parse(request.params)

      const transferService = TransferFactory.getInstance()

      const transferById = await transferService.getById(validatedData.id)

      if (!transferById) {
        throw new Error("Transferência não encontrada")
      }

      return response.status(200).json(transferById)
    } catch(error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ error: error.errors })
      } 

      if (error instanceof Error) {
        return response.status(500).json({ error: error.message })
      }
    }
  }
}