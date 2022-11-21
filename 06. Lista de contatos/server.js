//Importando as depenências do express, nunjucks e methodoverride
const express = require("express")
const methodOverride = require("method-override")
const nunjucks = require("nunjucks")

//Importando as rotas e criando o server
const routes = require("./controller/routes")
const server = express()

//Cofigurando o nunjucks e a engine de renderização do projeto
server.set("view engine", "njk")
nunjucks.configure("views", {
    express: server
})

//Aplicando os middlewares
server.use(methodOverride("_method")) //Habilitando métodos PUT e DELETE no form html
server.use(express.static("./public"))
server.use(express.urlencoded({ extended: true })) //Hbilitando body parser
server.use(routes)

//Iniciando o servidor na porta 5000
server.listen("5000", () => {
    console.log("server is running")
})
