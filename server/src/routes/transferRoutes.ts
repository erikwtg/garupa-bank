import { Router } from "express"

const route = Router()

route.get("/", (request, response) => {
  response.send("ALIVE")
})

export default route
