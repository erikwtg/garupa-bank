import { Router } from "express"
import TransferRoutes from "./transferRoutes.ts"

const route = Router()

route.use("/transfer", TransferRoutes)

export default route
