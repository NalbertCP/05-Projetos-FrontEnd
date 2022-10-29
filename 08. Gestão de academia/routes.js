/*Importando as dependências*/
const express = require("express")
const instructors = require("./controllers/instructors")
const members = require("./controllers/members")
const routes = express.Router()

routes.get("/data",(req, res)=>{
    res.setHeader("Cache-Control", "private, no-cache")
    res.sendFile(__dirname + "/data.json")
})

/*Rotas de acesso às funcionalidades dos instrutores*/
routes.get("/",(req,res)=>res.redirect("/instructors"))
routes.get("/instructors",instructors.index)
routes.get("/instructors/create",instructors.create)
routes.get("/instructors/:id",instructors.findInstructor)
routes.get("/instructors/:id/edit",instructors.edit)
routes.post("/instructors", instructors.post)
routes.put("/instructors",instructors.put)
routes.delete("/instructors",instructors.delete)

/*Rotas de acesso às funcionalidades dos membros*/
routes.get("/members",members.index)
routes.get("/members/create",members.create)
routes.get("/members/:id",members.findMember)
routes.get("/members/:id/edit",members.edit)
routes.post("/members", members.post)
routes.put("/members",members.put)
routes.delete("/members",members.delete)

module.exports = routes