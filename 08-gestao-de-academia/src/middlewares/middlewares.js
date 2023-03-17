const { resolve } = require("path")
const { cookieParser, generateHash } = require("../utils/utils.js")
const { readFile, writeFile } = require("fs").promises
const { mock } = require("../utils/mock.js")

module.exports.invalidRoutes = function (req, res) {
    res.status(404).render("./errors.njk", {
        status: "Error 404",
        msg: "We could not find the page you're looking for."
    })
}

module.exports.handleUserId = async function (req, res, next) {
    const defaultCookieOptions = { maxAge: 31536000000, sameSite: "strict", httpOnly: true }
    const dataPath = resolve(process.cwd(), "./data.json")
    const prettyCookies = cookieParser(req.headers.cookie)
    let data

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        return res.status(500).send("Error 500.\nServer internal error")
    }

    //verificando se existe um cookie cuja chave seja user_id_3000 e se há
    //um usuário salvo com esse cookie
    if (prettyCookies && prettyCookies?.user_id_3000) {
        if (data[prettyCookies.user_id_3000]) return next()
    }

    //Caso não exista um novo cookie é gerado
    let newCookie = generateHash(15)

    //Verificando se o cookie gerado ja existe em data.json
    while (data[newCookie]) {
        newCookie = generateHash(15)
    }

    //Adicionando um contato modelo ao novo usuário
    data[newCookie] = {
        user: newCookie,
        ...mock
    }

    //"Setando" o cookie na resposta para o client
    res.cookie("user_id_3000", newCookie, defaultCookieOptions)

    //Reescrevendo o arquivo data.json
    try {
        await writeFile(dataPath, JSON.stringify(data), { encoding: "utf-8" })
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        return res.status(500).send("Error 500.\nServer internal error")
    }

    return res.redirect(req.url)
}
