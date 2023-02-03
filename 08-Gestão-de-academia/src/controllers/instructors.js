/* Importando variáveis e métodos*/
const { writeFile } = require("fs").promises
const { resolve } = require("path")
const { getAge, getBirthDate } = require("../utils/utils.js")
const data = require("../data.json")

/*Métodos na CRUD de intrutores */
module.exports.index = function (req, res) {
    res.render("Instructors/index.njk", { instructors: data.instructors })
}
module.exports.create = function (req, res) {
    res.render("./Instructors/create")
}
module.exports.post = async function (req, res) {
    const filePath = resolve(__dirname, "../data.json")
    const keys = Object.keys(req.body)

    //Verificando se todos os campos foram preenchidos
    for (let key of keys) {
        try {
            if (req.body[key] === "")
                throw new Error(
                    "Error 422: the user needs to fill all the fields before sending the form."
                )
        } catch (error) {
            return res.status(422).render("./errors.njk", {
                status: "Error 422",
                msg: "Please fill all the fields before sending the form."
            })
        }
    }

    //Tratando os dados do req.boby e adicionando novos dados
    let { avatar, name, birth, gender, services } = req.body
    birth = Date.parse(birth)
    services = services.replace(/ /g, "").split(",")
    const createdAt = Date.now()
    const id = createdAt.toString()
    const sinceDate = new Intl.DateTimeFormat("pt-BR").format(createdAt)
    data.instructors.push({
        id, // Não veio do req.body
        avatar,
        name,
        birth,
        gender,
        services,
        createdAt, // Não veio do req.body
        sinceDate // Não veio do req.body
    })

    //Atualizando o arquivo data.json com o cadastro do novo instrutor

    try {
        await writeFile(filePath, JSON.stringify(data, null, 4), { encoding: "utf-8" })
        return res.redirect(`/instructors/${id}`)
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Sorry, we're facing some problems in the server."
        })
    }
}
module.exports.findInstructor = async function (req, res) {
    let { id } = req.params
    const foundInstructor = { ...data.instructors.find((value) => value.id == id) }

    try {
        if (!foundInstructor) throw new Error("Error 404: the instructor was not found.")
    } catch (error) {
        return res
            .status(404)
            .render("./errors.njk", { status: "Error 404", msg: "Sorry, instructor not found." })
    }

    foundInstructor.age = getAge(Date.now(), foundInstructor.birth)

    return res.render("./Instructors/showinstructor", { instructor: foundInstructor })
}
module.exports.edit = function (req, res) {
    //Buscando instrutor com base no ID
    let { id } = req.params
    const foundInstructor = { ...data.instructors.find((value) => value.id == id) }

    try {
        if (!foundInstructor)
            throw new Error("Error 404: the instructor, user is looking for was not found.")
    } catch (error) {
        return res
            .status(404)
            .render("./errors.njk", { status: "Error 404", msg: "Sorry, instructor not found." })
    }

    const { birth } = foundInstructor
    const instructor = {
        ...foundInstructor,
        birth: getBirthDate(birth).iso
    }

    return res.render("./Instructors/edit.njk", { instructor })
}
module.exports.put = async function (req, res) {
    const filePath = resolve(__dirname, "../data.json")
    let { id, birth, services } = req.body

    //Verificando se todos os campos foram preenchidos
    const keys = Object.keys(req.body)
    for (let key of keys) {
        try {
            if (req.body[key] === "")
                throw new Error(
                    "Error 422: the user needs to fill all the fields before sending the form."
                )
        } catch (error) {
            return res.status(422).render("./errors.njk", {
                status: "Error 422",
                msg: "Please fill all the fields before sending the form."
            })
        }
    }

    //Buscando instrutor com base no ID
    let foundIndex
    const foundInstructor = data.instructors.find((value, index) => {
        if (value.id == id) {
            foundIndex = index
            return value
        }
    })

    //Tratando o erro em caso de correspondência vazia para o instrutor
    try {
        if (!foundInstructor)
            throw new Error("Error 404: the instructor, user is looking for was not found.")
    } catch (error) {
        return res
            .status(404)
            .render("./errors.njk", { status: "Error 404", msg: "Sorry, instructor not found." })
    }

    //Atualizando os dados do instrutor
    services = services.replace(/ /g, "").split(",")
    let instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(birth),
        services: services
    }

    //Atualizando os dados do instrutor e reescrevendo o data.json
    data.instructors[foundIndex] = instructor
    try {
        await writeFile(filePath, JSON.stringify(data, null, 4), { encoding: "utf-8" })
        return res.redirect(`instructors/${id}`)
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Sorry, we're facing some problems in the server."
        })
    }
}
module.exports.delete = async function (req, res) {
    const filePath = resolve(__dirname, "../data.json")

    const { id } = req.body
    let foundIndex = data.instructors.findIndex((value) => value.id === id)

    //Tratando o erro caso o usuário tente excluir o instrutor mais de uma vez
    try {
        if (foundIndex < 0) throw new Error("Error 404: the instrutor was already deleted.")
    } catch (error) {
        return res
            .status(404)
            .render("./errors.njk", { status: "Error 404", msg: "instructor was already deleted." })
    }

    //Excluindo o instrutor do banco de dados
    data.instructors.splice(foundIndex, 1)

    //Reescrevendo o arquivo data.json
    try {
        await writeFile(filePath, JSON.stringify(data, null, 4), { encoding: "utf-8" })
        return res.redirect(`/instructors`)
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Sorry, we're facing some problems in the server."
        })
    }
}
