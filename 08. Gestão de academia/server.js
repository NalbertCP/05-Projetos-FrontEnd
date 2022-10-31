/*Importando dependências*/
const express = require("express")
const server = express()
const routes = require("./routes")
const nunjucks = require("nunjucks")
const methodOverride = require("method-override")

/*Middlewares*/
server.use(express.urlencoded({extended: true}))
server.use(express.static("./public", {
    setHeaders: function (res){
        res.setHeader("Cache-Control", "public, must-revalidate, max-age=60")
        res.setHeader("Vary", "Accept-Language")
    }
})) 
server.use(methodOverride("_method"))
server.use(routes)

/*conifigurando o nunjucks*/
nunjucks.configure("./views", {
    express: server,
    autoescape: false
})

/*Escolhendo a engeine para os arquivos dinâmicos*/
server.set("view engine", "njk") 

/*Iniciando o servidor*/
server.listen("5000", ()=>{
    console.log("Server is running")
})
