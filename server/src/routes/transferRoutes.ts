import { Router } from "express"
import { ZodError } from "zod"

import { TransferEntity } from "../entities/TransferEntity.ts"
import { TransferFactory } from "../factories/TransferFactory.ts"
import { createTransferSchema } from "../schemas/createTransferSchema.ts"
import { getTransferSchema } from "../schemas/getTransferSchema.ts"

const route = Router()

route.post("/", (request, response) => {
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
})

route.get("/", async (request, response) => {
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
})

route.get("/:id", async (request, response) => {
  try{
    const validatedData = getTransferSchema.parse(request.params)

    const transferService = TransferFactory.getInstance()

    const transferById = await transferService.getById(validatedData.id)

    response.status(200).json(transferById)
  } catch(error) {
    if (error instanceof ZodError) {
      response.status(400).json({ error: error.errors })
    } 

    if (error instanceof Error) {
      response.status(500).json({ error: error.message })
    }
  }
})

export default route
