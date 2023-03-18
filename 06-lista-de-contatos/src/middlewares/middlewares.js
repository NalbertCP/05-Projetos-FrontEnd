const { cookieParser, updateAge, generateHash, getAge } = require("../utils/utils")
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
    const userId = cookieParser(req.headers.cookie)["user_id"]
    const dataPath = resolve(process.cwd(), "./data.json")
    const prettyCookies = cookieParser(req.headers.cookie)

    if (prettyCookies && prettyCookies?.ages_updated) return next()

    try {
        data = JSON.parse(await fs.readFile(dataPath, { encoding: "utf-8" }))
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        return res.status(500).send("Error 500.\nServer internal error")
    }

    res.cookie("ages_updated", "true", {
        maxAge: 86400000,
        sameSite: "lax",
        httpOnly: true
    })

    await updateAge(res, data, userId)

    return next()
}

//Validando o id do usuário e criando um novo id se nescessário
async function handleUserId(req, res, next) {
    const defaultCookieOptions = { maxAge: 31536000000, sameSite: "lax", httpOnly: true }
    const dataPath = resolve(process.cwd(), "./data.json")
    const prettyCookies = cookieParser(req.headers.cookie)
    let data

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await fs.readFile(dataPath, { encoding: "utf-8" }))
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        return res.status(500).send("Error 500.\nServer internal error")
    }

    //verificando se existe um cookie cuja chave seja user_id e se há
    //um usuário salvo com esse cookie
    if (prettyCookies && prettyCookies?.user_id) {
        if (data[prettyCookies.user_id]) return next()
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
        contacts: [
            {
                id: `${Date.now()}`,
                name: "Contato teste",
                avatarURL:
                    "https://landscapesbypatricksteel.co.uk/wp-content/uploads/2015/01/rushmere_pond_in_snow_thumb-400x400.jpg",
                number: "(99) 99999-9999",
                birthStamp: 946684800000,
                age: getAge(946684800000),
                state: "BA",
                country: "Brasil"
            }
        ]
    }

    //"Setando" o cookie na resposta para o client
    res.cookie("user_id", newCookie, defaultCookieOptions)

    //Reescrevendo o arquivo data.json
    try {
        await fs.writeFile(dataPath, JSON.stringify(data), { encoding: "utf-8" })
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        return res.status(500).send("Error 500.\nServer internal error")
    }

    return res.redirect(req.url)
}
module.exports = { invalidRoutes, shouldUpdateAges, handleUserId }
