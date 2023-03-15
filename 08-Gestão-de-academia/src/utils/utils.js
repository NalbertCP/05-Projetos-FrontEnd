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
module.exports = { getAge, getBirthDate }
