//Importando dependências e variáveis
const express = require("express")
const contacts = require("../controllers/contacts")
const { invalidRoutes, shouldUpdateAges } = require("../middlewares/middlewares")
const routes = express.Router()

//Declaração das rotas utilizadas em server.js
routes.get("/", (req, res) => {
    res.redirect("/contacts")
})
routes.get("/contacts", shouldUpdateAges, contacts.index)
routes.get("/contacts/new", contacts.createContact)
routes.get("/contacts/:id", contacts.get)
routes.get("/contacts/:id/edition", contacts.editContact)
routes.post("/contacts", contacts.post)
routes.put("/contacts", contacts.put)
routes.delete("/contacts", contacts.deleteContact)

//middleware para tratar rotas inválidas
routes.use(invalidRoutes)

//Exportando as rotas para serem utilizadas em server.js
module.exports = routes
