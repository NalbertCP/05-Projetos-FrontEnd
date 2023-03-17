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
function cookieParser(rawCookies) {
    if (typeof rawCookies !== "string") return undefined
    const prettyCookies = rawCookies
        .replace(/ /g, "")
        .replace(/&/g, ";")
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce((acc, value) => {
            acc[value[0]] = value[1]
            return acc
        }, {})
    return prettyCookies
}
function generateHash(idLength) {
    const charactersList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let id = ""
    for (let i = 0; i < idLength; i++) {
        const random = Math.floor(Math.random() * charactersList.length)
        id = id.concat(charactersList[random])
    }
    return id
}

module.exports = { getAge, getBirthDate, cookieParser, generateHash }
