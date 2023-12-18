import express from "express"
import path from "path"

export const ConfigViewEngine = (app) => {
    app.use(express.static("./public"))
    app.set("view engine", "ejs")
    app.set("views", "./src/views")
}
