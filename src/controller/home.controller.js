import createError from "http-errors"
import MongooseLogger from "../logger/mongoose.logger"

export function homeController(req, res, next) {
    try {
        MongooseLogger.logger("error", "helloo")
        return res.render("index.ejs")
    } catch (err) {
        return next(createError(500))
    }
}
