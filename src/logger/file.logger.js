import * as winston from "winston"
import "winston-daily-rotate-file"
import path from "path"

export default class LoggerFile {
    static instance = null

    constructor() {
        let _transport = new winston.transports.DailyRotateFile({
            filename: path.join(__dirname, "../files/logger/filelog-%DATE%.log"),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "10d",
            prepend: true,
            json: false,
            format: winston.format.printf((info) => {
                return ` ${info.timestamp}:${info.label}:${info.message}`
            }),
        })

        _transport.on("rotate", function (oldFilename, newFilename) {
            console.log(oldFilename, newFilename)
        })

        LoggerFile.instance = winston.createLogger({
            transports: [_transport],
            format: winston.format.combine(
                winston.format.label({ label: "Logger Page" }),
                winston.format.timestamp(),
                winston.format.prettyPrint(),
                winston.format.printf((info) => {
                    return `${info.timestamp}:${info.label}:${info.message}`
                }),
            ),
        })
    }
}
