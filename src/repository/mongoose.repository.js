import mongoose, { connection } from "mongoose"
import LoggerFile from "../logger/file.logger"
export default class MongooseRepository {
    static instance

    constructor(connectionstring) {
        this.connectionstring = connectionstring
    }

    async connect() {
        try {
            if (this.connectionstring) {
                MongooseRepository.instance = await mongoose.connect(
                    this.connectionstring,
                    {
                        serverSelectionTimeoutMS: 5000,
                        dbName: "BlogDb",
                    },
                )
            }
            LoggerFile.instance.info("Connected to MongooseRepository")
        } catch (error) {
            // log error
            LoggerFile.instance.error(
                "Failed connect to MongooseRepository " + error.message,
            )
        }
    }
}
