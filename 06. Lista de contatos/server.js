//Importando as depenências do express, nunjucks e methodoverride
const express = require("express")
const methodOverride = require("method-override")
const nunjucks = require("nunjucks")

//Importando as rotas e criando o server
const routes = require("./routes")
const server = express()

//Cofigurando o nunjucks e a engine de renderização do projeto
server.set("view engine","njk")
nunjucks.configure("views",{
    express:server
})

//Aplicando os middlewares
server.use(methodOverride("_method"))//Habilitando a utilizando dos métodos PUT e DELETE no form html
server.use(express.static("./public"))//Determinando o diretório dos arquivos estáticos que seriverão ao client
server.use(express.urlencoded({extended:true}))//Habilitando o body parser para decodificar os dados do req.body
server.use(routes)//Utilizando as rotas definidas em routes.js

//Iniciando o servidor na porta 5000
server.listen("5000",()=>{
    console.log("server is running")
})