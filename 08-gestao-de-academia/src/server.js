/*Importando dependências*/
require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")
const server = express()
const routes = require("./routes/routes")
const nunjucks = require("nunjucks")
const { resolve } = require("path")

/*Middlewares*/
server.use(express.urlencoded({ extended: true }))
server.use(
    express.static(resolve(__dirname, "../public"), {
        setHeaders: function (res) {
            res.setHeader("Cache-Control", "public, must-revalidate, max-age=0")
            res.setHeader("Vary", "Accept-Language")
        }
    })
)
server.use(methodOverride("_method"))
server.use(routes)

/*conifigurando o nunjucks*/
nunjucks.configure(resolve(__dirname, "./views"), {
    express: server,
    autoescape: false
})

/*Escolhendo a engine para os arquivos dinâmicos*/
server.set("view engine", "njk")

/*Iniciando o servidor*/
server.listen(process.env.PORT, () => {
    console.log("Server is running")
})
