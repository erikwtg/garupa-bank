import { Router } from "express"
import TransferRoutes from "./transferRoutes.ts"

const route = Router()

route.use("/transfers", TransferRoutes)

export default route
