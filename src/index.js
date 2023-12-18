import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import * as CONFIG_SERVER from "./config"
import LoggerFile from "./logger/file.logger"
import MongooseRepository from "./repository/mongoose.repository"
import MongooseLogger from "./logger/mongoose.logger"
import initRouter from "./router"
import createError from "http-errors"

dotenv.config()

const app = express()
new LoggerFile()
new MongooseLogger()

try {
    LoggerFile.instance.info("STARTING")
    LoggerFile.instance.info("CONFIGURATION")

    app.use(cookieParser())

    app.use(bodyParser.json({ limit: "100mb" }))

    app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }))

    // config core configuration
    app.use(
        cors({
            origin: true,
        }),
    )

    // config morgan

    app.use(
        helmet({
            crossOriginOpenerPolicy: true,
            contentSecurityPolicy: true,
        }),
    )

    CONFIG_SERVER.ConfigViewEngine(app)
    initRouter(app)

    app.use((req, res, next) => {
        return next(createError(404))
    })
    app.use((err, req, res, next) => {
        let status = err.status || 500
        res.status(status).render(`${status}.ejs`)
    })

    let mongo = new MongooseRepository(process.env.MONGODB_CONNECTION)
    ;(async () => await mongo.connect())()

    LoggerFile.instance.info("START PORT")
} catch (error) {
    LoggerFile.instance.error(error)
    console.log(error)
    let router = express.Router()
    app.use(
        router.all("*", (req, res, next) => {
            return res.status(500).render("500.ejs")
        }),
    )
}

let port = process.env.PORT || 3330
app.listen(port, async () => {
    console.log("Server is running on port", port)
})
