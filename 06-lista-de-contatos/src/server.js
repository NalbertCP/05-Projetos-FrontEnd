//Importando as dependências do express, nunjucks e methodoverride
require("dotenv").config()
const helmet = require("helmet").default
const methodOverride = require("method-override")
const nunjucks = require("nunjucks")
const { resolve } = require("path")
const express = require("express")

//Importando as rotas e criando o server
const routes = require("./routes/routes")
const server = express()

//Configurando o nunjucks e a engine de renderização do projeto
server.set("view engine", "njk")
nunjucks.configure(__dirname + "/views", { express: server })

helmet.contentSecurityPolicy

//Aplicando os middlewares
server.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "img-src": "*",
                "style-src": ["'self'", "https://fonts.googleapis.com"],
                "font-src": ["'self'", "https://fonts.gstatic.com"]
            }
        }
    })
)
server.use(methodOverride("_method")) //Habilitando os métodos PUT e DELETE no form html
server.use(express.static(resolve(__dirname, "../public")))
server.use(express.urlencoded({ extended: true })) //Habilitando o body parser
server.use(routes)

//Iniciando o servidor na porta 3000
server.listen(process.env.PORT, () => {
    console.log("server is running")
})
