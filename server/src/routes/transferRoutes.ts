import { Router } from "express"
import { TransferController } from "../controllers/TransferController.ts"

const route = Router()

route.post("/", TransferController.create)

route.get("/", TransferController.getAll)

route.get("/:id", TransferController.getById)

export default route
