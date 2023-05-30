/*Importando as dependências*/
const express = require("express")
const api = require("../controllers/api.js")
const instructors = require("../controllers/instructors")
const members = require("../controllers/members")
const { invalidRoutes, handleUserId } = require("../middlewares/middlewares")

const routes = express.Router()

//Validando o cookie enviando pelo usuário
routes.use(handleUserId)

routes.get("/data", api.getData)

/*Rotas de acesso às funcionalidades dos instrutores*/
routes.get("/", (req, res) => res.redirect(301, "/instructors"))
routes.get("/instructors", instructors.index)
routes.get("/instructors/new", instructors.create)
routes.get("/instructors/:id", instructors.findInstructor)
routes.get("/instructors/:id/edition", instructors.edit)
routes.post("/instructors", instructors.post)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)

/*Rotas de acesso às funcionalidades dos membros*/
routes.get("/members", members.index)
routes.get("/members/new", members.create)
routes.get("/members/:id", members.findMember)
routes.get("/members/:id/edition", members.edit)
routes.post("/members", members.post)
routes.put("/members", members.put)
routes.delete("/members", members.delete)

//middleware para rotas inválidas
routes.use(invalidRoutes)

module.exports = routes
