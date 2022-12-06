//Importando dependências e variáveis
const express = require("express")
const methods = require("./methods")
const routes = express.Router()

//Declaração das rotas utilizadas em server.js
routes.get("/", (req, res) => {
    res.redirect("/contacts")
})
routes.get("/contacts", methods.index)
routes.get("/contacts/search", methods.searchContact)
routes.get("/contacts/create", methods.createContact)
routes.get("/contacts/:id", methods.get)
routes.get("/contacts/:id/edit", methods.editContact)
routes.post("/contacts", methods.post)
routes.put("/contacts", methods.put)
routes.delete("/contacts", methods.deleteContact)

//Exportando as rotas para serem utilizadas em server.js
module.exports = routes
