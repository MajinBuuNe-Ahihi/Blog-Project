import express from "express"
import * as CONTROLLER from "../controller/index"

const router = express.Router()

const initRouter = (app) => {
    router.get("/", CONTROLLER.homeController)
    app.use(router)
}

export default initRouter
