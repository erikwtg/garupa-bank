import { Router } from "express"
import { TransferController } from "../controllers/TransferController.ts"

const route = Router()

route.post("/", TransferController.create)
route.get("/", TransferController.getAll)
route.get("/:id", TransferController.getById)
route.get("/account/:accountId", TransferController.getByAccountId)

export default route
