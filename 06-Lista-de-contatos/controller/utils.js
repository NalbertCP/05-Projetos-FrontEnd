const data = require("../data.json")
const fs = require("fs")

/*Funções utilizadas em routes.js*/
function getAge(birthStamp) {
    //Calculando a idade do contato com base na data de nascimento
    const dateToday = new Date(Date.now())
    const dateBirth = new Date(birthStamp)

    const months = dateToday.getMonth() - dateBirth.getMonth()
    const days = dateToday.getDate() - dateBirth.getMonth()
    let years = dateToday.getFullYear() - dateBirth.getFullYear()

    if (months < 0 || (months == 0 && days < 0)) years -= 1

    return years
}
function updateAge(res) {
    //Atualizando a idade de cada contanto em caso de aniversário
    for (let contact of data.contacts) {
        contact.age = getAge(contact.birthStamp)
    }

    //Reescrevendo o arquivo data.JSON com a idade atualizada
    fs.writeFile("data.json", JSON.stringify(data, null, 4), (error) => {
        if (error) res.send("An error has ocurred during the writing file")
    })
}
function sortContacts(res) {
    data.contacts.sort((a, b) => {
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1
        else return 0
    })

    //Reescrevendo o arquivo data.JSON com os objetos ordenados em ordem alfabética
    fs.writeFile("data.json", JSON.stringify(data, null, 4), (error) => {
        if (error) res.send("An error has ocurred during the writing file")
    })
}
function getBithDate(birthStamp) {
    const birthDate = new Date(birthStamp)

    let year = birthDate.getUTCFullYear()
    let mounth = `0${birthDate.getUTCMonth() + 1}`.slice(-2)
    let day = `0${birthDate.getUTCDate()}`.slice(-2)

    let dateIso = `${year}-${mounth}-${day}`
    return dateIso
}

module.exports = { updateAge, getAge, sortContacts, getBithDate }
