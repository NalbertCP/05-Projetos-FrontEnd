const data = require("../data.json")
const fs = require("fs").promises

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
async function updateAge(res) {
    //Atualizando a idade de cada contanto em caso de aniversário
    for (let contact of data.contacts) {
        contact.age = getAge(contact.birthStamp)
    }

    //Reescrevendo o arquivo data.JSON com a idade atualizada
    try {
        await fs.writeFile("data.json", JSON.stringify(data, null, 4), { encoding: "utf-8" })
    } catch (error) {
        res.setHeader("Content-Type", "text/plain")
        res.status(500).send(
            "Error 500.\nSorry for the trouble, an error has occurred in the server."
        )
    }
}
function sortContacts(contacts) {
    const copyContacts = JSON.parse(JSON.stringify(contacts))
    copyContacts.sort((a, b) => {
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1
        else return 0
    })

    //Retornando os contatos em ordem alfabética
    return copyContacts
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
