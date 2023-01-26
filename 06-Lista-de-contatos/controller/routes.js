//Importando dependências e variáveis
const express = require("express")
const methods = require("./methods")
const { invalidRoutes, shouldUpdateAges } = require("./middlewares")
const routes = express.Router()

//Declaração das rotas utilizadas em server.js
routes.get("/", (req, res) => {
    res.redirect("/contacts")
})
routes.get("/contacts", shouldUpdateAges, methods.index)
routes.get("/contacts/new", methods.createContact)
routes.get("/contacts/:id", methods.get)
routes.get("/contacts/:id/edition", methods.editContact)
routes.post("/contacts", methods.post)
routes.put("/contacts", methods.put)
routes.delete("/contacts", methods.deleteContact)

//middleware handler para rotas inválidas
routes.use(invalidRoutes)

//Exportando as rotas para serem utilizadas em server.js
module.exports = routes
