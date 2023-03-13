const { cookieParser, updateAge } = require("../utils/utils")
const { resolve } = require("path")
const fs = require("fs").promises

//Middleware para tratar rotas inválidas
function invalidRoutes(req, res) {
    res.setHeader("Content-Type", "text/plain")
    return res.status(404).send("Error 404.\nWe could not found the page you're looking for.")
}

//Atualizando a idade dos contatos uma vez ao dia em caso de aniversário
async function shouldUpdateAges(req, res, next) {
    let data
    const dataPath = resolve(process.cwd(), "./data.json")

    try {
        data = JSON.parse(await fs.readFile(dataPath, { encoding: "utf-8" }))
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        return res.status(500).send("Error 500.\nServer internal error")
    }

    const agesUpdated = cookieParser(req.headers.cookie)
    if (!agesUpdated || !agesUpdated?.ages_updated) {
        res.cookie("ages_updated", "true", {
            maxAge: 86400000,
            sameSite: "strict",
            httpOnly: true
        })
        await updateAge(res, data)
    }
    next()
}

module.exports = { invalidRoutes, shouldUpdateAges }
