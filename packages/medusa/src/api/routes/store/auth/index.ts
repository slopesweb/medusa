import { Router } from "express"
import middlewares from "../../../middlewares"
import { Customer } from "./../../../.."

const route = Router()

export default (app) => {
  app.use("/auth", route)

  route.get(
    "/",
    middlewares.requireCustomerAuthentication(),
    middlewares.wrap(require("./get-session").default)
  )
  route.get("/:email", middlewares.wrap(require("./exists").default))
  route.delete("/", middlewares.wrap(require("./delete-session").default))
  route.post("/", middlewares.wrap(require("./create-session").default))

  return app
}

export type StoreAuthRes = {
  customer: Customer
}

export type StoreGetAuthEmailRes = {
  exists: boolean
}

export * from "./create-session"
export * from "./delete-session"
export * from "./exists"
export * from "./get-session"
