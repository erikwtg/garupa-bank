import { Router } from "express"
import { AccountController } from "../controllers/AccountController.ts"

const route = Router()

route.get("/:id", AccountController.getById)

export default route
