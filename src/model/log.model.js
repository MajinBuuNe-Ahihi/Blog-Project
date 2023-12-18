import mongoose from "mongoose"
const { Schema } = mongoose

const LogSchema = new Schema({
    logged: Date,
    type: String,
    message: String,
})

const LogModel = mongoose.model("Log", LogSchema)
export default LogModel
