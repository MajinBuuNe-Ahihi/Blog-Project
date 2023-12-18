import LogModel from "../model/log.model"

export default class MongooseLogger {
    constructor() {}

    static async logger(type, message) {
        let loggerInstance = new LogModel({
            type: type,
            message: message,
            logged: new Date(),
        })
        await loggerInstance.save()
    }
}
