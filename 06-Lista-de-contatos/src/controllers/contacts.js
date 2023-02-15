//Importando dependências e variáveis
const fs = require("fs").promises
const data = require("../data.json")
const { getAge, sortContacts, getBithDate } = require("../utils/utils.js")
const { resolve } = require("path")

//Métodos utilizados em routes.js
async function index(req, res) {
    const { name } = req.query
    const sortedContacts = sortContacts(data.contacts) //Ordenando os contatos em ordem alfabética

    if (!(name ?? false)) {
        return res.render("./Contacts/index.njk", { contacts: sortedContacts })
    }

    if (name === "") return res.render("./Contacts/index.njk", { contacts: sortedContacts })

    //Filtrando os contatos da lista com base no input do usuário
    let upperName = name.toUpperCase()
    let filteredArray = data.contacts.filter((value) => {
        return value.name.toUpperCase().match(upperName)
    })

    //Renderizando a página not-found em caso de correspodência vazia (array.length === 0)
    if (filteredArray.length < 1) return res.status(404).render("./404-not-found.njk")

    return res.render("./Contacts/index.njk", { contacts: sortContacts(filteredArray) })
}
function createContact(req, res) {
    res.render("./Contacts/create.njk")
}
function get(req, res) {
    //Entrando na página do contato com base no id
    const { id } = req.params
    const foundContact = data.contacts.find((value) => value.id === id)

    //Enviando um status 404 em caso de correspondência vazia
    if (!foundContact) {
        res.setHeader("Content-Type", "text/plain")
        res.status(404).send("Error 404.\nContact not found")
    }

    return res.render("./Contacts/contact-info.njk", { contact: foundContact })
}
function editContact(req, res) {
    //Copiando os dados do contato para edição
    const { id } = req.params
    const foundContact = { ...data.contacts.find((value) => value.id === id) }

    //Enviando um status 404 em caso de correspondência vazia
    if (Object.keys(foundContact).length === 0) {
        res.setHeader("Content-Type", "text/plain")
        res.status(404).send("Error 404.\nContact not found")
    }

    //Alterando a propriedade birthStamp do contato para o formato aceito pelo input:date do formulário
    const { birthStamp } = foundContact
    foundContact.birthDate = getBithDate(birthStamp)

    return res.render("./Contacts/edit.njk", { contact: foundContact })
}
async function post(req, res) {
    const filePath = resolve(__dirname, "../data.json")
    const keys = Object.keys(req.body)

    //Verificando se todos os campos foram preenchidos.
    for (let key of keys) {
        if (req.body[key] == "") {
            res.setHeader("Content-Type", "text/plain")
            return res
                .status(422)
                .send("Error 422.\nPlease fill all the fields before sending the form.")
        }
    }

    //Tratando os dados do formulário de cadastro
    let { avatarURL, name, number, birth: birthStamp, state, country } = req.body
    birthStamp = Date.parse(birthStamp)
    const id = `${Date.now()}`
    const age = getAge(birthStamp)
    data.contacts.push({
        id,
        name,
        avatarURL,
        number,
        birthStamp, //Não faz parte do req.body
        age, //Não faz parte do req.body
        state,
        country
    })

    //Reescrevendo o arquivo data.json
    try {
        await fs.writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" })
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        return res
            .status(500)
            .send("Error 500.\nSorry for the trouble, an error has occurred in the server.")
    }

    return res.redirect("/contacts")
}
async function put(req, res) {
    const filePath = resolve(__dirname, "../data.json")
    const keys = Object.keys(req.body)

    //Verificando se todos os campos foram preenchidos.
    for (let key of keys) {
        if (req.body[key] === "") {
            res.setHeader("Content-Type", "text/plain")
            return res
                .status(422)
                .send("Error 422: Please fill all the fields before sending the form.")
        }
    }

    let { id, birth, name, avatarURL, birth: birthStamp, number, state, country } = req.body
    let foundIndex

    //Buscando o index referente a posição do contato no array em data.json
    const foundContact = data.contacts.find((value, index) => {
        if (value.id === id) {
            foundIndex = index
            return true
        }
    })
    if (!foundContact || foundIndex < 0) {
        res.setHeader("Content-Type", "text/plain")
        return res.status(404).send("Erro 404.\nContact not found.")
    }

    //Alterando os dados do contato de acordo com as informações fornecidas no formulário
    birthStamp = Date.parse(birth)
    data.contacts[foundIndex] = {
        ...foundContact,
        name: name,
        avatarURL: avatarURL,
        number: number,
        state: state,
        country: country,
        birthStamp: birthStamp,
        age: getAge(birth)
    }

    //Reescrevendo o arqivo data.json com as informações do contato alterada
    try {
        await fs.writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" })
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        return res
            .status(500)
            .send("Error 500.\nSorry for the trouble, an error has occurred in the server.")
    }

    return res.redirect(`contacts/${id}`)
}
async function deleteContact(req, res) {
    const filePath = resolve(__dirname, "../data.json")
    const { deleteId } = req.body

    //Buscando a posição do contato que será deletado
    const foundIndex = data.contacts.findIndex((value) => value.id == deleteId)

    //Enviando um status 404 em caso de conrespondência vazia
    if (foundIndex < 0) {
        res.setHeader("Content-Type", "text/plain")
        return res.status(404).send("Erro 404.\nContact was already deleted.")
    }

    //Deletando o contato com base no index encontrado anteriormente
    data.contacts.splice(foundIndex, 1)

    //Reescrevendo o arquivo data.json
    try {
        await fs.writeFile(filePath, JSON.stringify(data), { encoding: "utf-8" })
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        return res
            .status(500)
            .send("Error 500.\nSorry for the trouble, an error has occurred in the server.")
    }

    return res.redirect("/contacts")
}

//Exportando os métodos para serem utilizados em routes.js
module.exports = {
    index,
    createContact,
    get,
    editContact,
    post,
    put,
    deleteContact
}
