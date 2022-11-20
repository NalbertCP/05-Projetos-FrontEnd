//Importando dependências e variáveis
const fs = require("fs")
const data = require("../data.json")
const {getAge, updateAge, sortContacts, getBithDate} = require("./utils.js")

//Métodos utilizados em routes.js
function index (req, res){
    updateAge(res) //Atualizando a data de cada contacto em caso de aniversário
    sortContacts(res) //Ordenando os contatos em ordem alfabética
    res.render("./Contacts/index.njk", {contacts: data.contacts})
}
function searchContact(req, res){
    //Redirecionando o usário para a página inicial caso o input esteja vazio
    let {name} = req.query
    if(!name) return res.redirect("/contacts")

    //Filtrando os contatos da lista com base do input do usuário
    let upperName = name.toUpperCase()
    let filteredArray = data.contacts.filter((value)=>{
        return value.name.toUpperCase().match(upperName)
    })
    
    //Renderizando a página not-found em caso de correspodência vazia (array.length === 0)
    if (filteredArray.length<1)
    return res.status(404).render("./404-not-found.njk")

    return res.render("./Contacts/search-result.njk", {filteredArray})
}
function createContact(req, res){
    res.render("./Contacts/create.njk")
}
function get(req, res){
    //Entrando na página do contato com base no id
    const {id} = req.params
    const foundContact = data.contacts.find((value)=>value.id === id)

    //Enviando um status 404 em caso de correspondência vazia
    if (!foundContact)
    return res.status(404).send("Erro 404: Contact not found")

    return res.render("./Contacts/contact-info.njk", {contact: foundContact})
}
function editContact(req, res){
    //Copiando os dados do contato para edição
    const {id} = req.params
    const foundContact = {...data.contacts.find((value)=>value.id === id)}

    //Enviando um status 404 em caso de correspondência vazia
    if (!foundContact)
    return res.status(404).send("Erro 404: Contact not found")

    //Alterando a propriedade birthStamp do contato para o formato aceito pelo input tipo date do formulário
    const {birthStamp} = foundContact
    foundContact.birthDate = getBithDate(birthStamp)

    return res.render("./Contacts/edit.njk", {contact: foundContact})
}
function post(req, res){
    //Vericiando se todos os campos foram preenchidos.
    const keys = Object.keys(req.body)
    for (let key of keys){
        if (req.body[key]=="")
        return res.status(422).send("ERROR 422: Please fill all the fields before sending the form")
    }

    //Tratando os dados do formulário de cadastro
    let {avatarURL, name, number, birth: birthStamp, state, country} = req.body
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
    
    //Escrevendo os dados do formulário no arquivo data.json
    fs.writeFile("./data.json", JSON.stringify(data, null, 4), (error)=>{
        if (error) 
        return res.send("Sorry for the trouble, an error has occurred> :(")
    })

    return res.redirect("/contacts")
}
function put(req, res){
    //Vericiando se todos os campos foram preenchidos.
    const keys = Object.keys(req.body)
    for (let key of keys){
        if (req.body[key]==="")
        return res.status(422).send("Error 422: Please fill all the fields before sending the form")
    }

    let {id, birth, name, avatarURL, birth: birthStamp, number, state, country} = req.body
    let foundIndex

    //Buscando o index referente a posição do contato no array em data.json
    const foundContact = data.contacts.find((value, index)=>{
        if (value.id === id){
            foundIndex = index
            return true
        }
    })
    if (!foundContact || foundIndex<0)
    return res.status(404).send("Erro 404: Contact not found")

    //Alterando os dados do contato de acordo com as informações fornecidas no formulário
    birthStamp = Date.parse(birth)
    data.contacts[foundIndex]={
        ...foundContact,
        name: name,
        avatarURL: avatarURL,
        number: number,
        state: state,
        country: country,
        birthStamp: birthStamp,
        age: getAge(birth)
    }

    //Resscrevendo o arqivo data.json com as informações do contato alterada
    fs.writeFile("data.json", JSON.stringify(data, null, 4), (error)=>{
        if(error)
        return res.send("Sorry for the trouble, an error has occurred> :(")
    })

    return res.redirect(`contacts/${id}`)
}
function deleteContact (req, res){
    //Buscando a posição do contato que será deleteado
    const {deleteId} = req.body
    const foundIndex = data.contacts.findIndex((value)=> value.id==deleteId)

    //Enviando um status 404 em caso de conrespondência vazia
    if(foundIndex<0)
    return res.status(404).send("Erro 404: Contact was already deleted")
    
    //Deleteando o contato com base no index encontrado anteriormente
    data.contacts.splice(foundIndex, 1)

    //Reescrevendo o arquivo data.json
    fs.writeFile("data.json", JSON.stringify(data, null, 4), (error)=>{
        if (error)
        return res.send("Sorry for the trouble, an error has occurred> :(")
    })

    return res.redirect("/contacts")
}

//Exportando os métodos para serem utilizados em routes.js
module.exports = {
    index,
    searchContact,
    createContact,
    get,
    editContact,
    post,
    put,
    deleteContact
}
