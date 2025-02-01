import { Router } from "express"
import AuthRoutes from "./authRoutes.ts"
import AccountRoutes from "./accountRoutes.ts"
import TransferRoutes from "./transferRoutes.ts"

const route = Router()

route.use("/auth", AuthRoutes)
route.use("/account", AccountRoutes)
route.use("/transfers", TransferRoutes)

export default route
