import { Router } from "express"
import { AccountController } from "../controllers/AccountController.ts"

const route = Router()

route.get("/:id", AccountController.getById)
route.get("/user/:id", AccountController.getByUserId)

export default route
