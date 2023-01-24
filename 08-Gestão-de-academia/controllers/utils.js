const { writeFile } = require("fs").promises

/* Funções utilizadas em routes.js*/
function getAge(actualStamp, birthStamp) {
    const actualDate = new Date(actualStamp)
    const birthDate = new Date(birthStamp)

    let year = actualDate.getFullYear() - birthDate.getFullYear()
    const month = actualDate.getMonth() - birthDate.getMonth()
    const day = actualDate.getDate() - birthDate.getDate()

    if (month < 0 || (month == 0 && day < 0)) year = year - 1
    return year
}
function getBirthDate(birth) {
    const date = new Date(birth)

    const year = date.getUTCFullYear()
    const mounth = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
        iso: `${year}-${mounth}-${day}`,
        memberDate: `${day}/${mounth}`
    }
}
async function updatePersonAge(res, { person, type }) {
    const data = require("../data.json")
    const dateNow = Date.now()
    const { birth } = person

    /*Calculando a idade atual*/
    person.age = getAge(dateNow, birth)
    let foundIndex = data[type].findIndex((value) => value.id === person.id)

    /*Alterando a idade do instrutor/aluno e reescrevendo data.json*/
    data[type][foundIndex].age = getAge(dateNow, birth)

    await writeFile("data.json", JSON.stringify(data, null, 4), { encoding: "utf-8" })
}

module.exports = {
    getAge,
    getBirthDate,
    updatePersonAge
}
