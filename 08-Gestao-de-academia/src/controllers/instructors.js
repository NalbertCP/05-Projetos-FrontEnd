/* Importando variáveis e métodos*/
const { writeFile, readFile } = require("fs").promises
const { resolve } = require("path")
const { getAge, getBirthDate, cookieParser } = require("../utils/utils.js")

/*Métodos na CRUD de instrutores */
module.exports.index = function (req, res) {
    res.render("Instructors/index.njk")
}
module.exports.create = function (req, res) {
    res.render("./Instructors/create")
}
module.exports.post = async function (req, res) {
    let data
    const dataPath = resolve(process.cwd(), "./data.json")
    const userId = cookieParser(req.headers.cookie)["user_id_3000"]
    const keys = Object.keys(req.body)

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Server internal error."
        })
    }

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
    data[userId].instructors.push({
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
        await writeFile(dataPath, JSON.stringify(data), { encoding: "utf-8" })
        return res.redirect(`/instructors/${id}`)
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Sorry, we're facing some problems in the server."
        })
    }
}
module.exports.findInstructor = async function (req, res) {
    let data
    let { id } = req.params
    const dataPath = resolve(process.cwd(), "./data.json")
    const userId = cookieParser(req.headers.cookie)["user_id_3000"]

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))[userId]
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Server internal error."
        })
    }

    //Buscando o instrutor em data.json com base no id recebido
    const foundInstructor = { ...data.instructors.find((value) => value.id == id) }
    try {
        if (Object.keys(foundInstructor).length === 0) {
            throw new Error("Error 404: the instructor was not found.")
        }
    } catch (error) {
        return res
            .status(404)
            .render("./errors.njk", { status: "Error 404", msg: "Sorry, instructor not found." })
    }

    foundInstructor.age = getAge(Date.now(), foundInstructor.birth)

    return res.render("./Instructors/showinstructor", { instructor: foundInstructor })
}
module.exports.edit = async function (req, res) {
    let data
    let { id } = req.params
    const dataPath = resolve(process.cwd(), "./data.json")
    const userId = cookieParser(req.headers.cookie)["user_id_3000"]

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))[userId]
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Server internal error."
        })
    }

    //Buscando o instrutor em data.json com base no id recebido
    const foundInstructor = { ...data.instructors.find((value) => value.id == id) }
    try {
        if (Object.keys(foundInstructor).length === 0) {
            throw new Error("Error 404: the instructor, user is looking for was not found.")
        }
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
    let data
    let foundIndex
    const keys = Object.keys(req.body)
    let { id, birth, services } = req.body
    const dataPath = resolve(process.cwd(), "./data.json")
    const userId = cookieParser(req.headers.cookie)["user_id_3000"]

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Server internal error."
        })
    }

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

    //Buscando instrutor com base no ID
    const foundInstructor = data[userId].instructors.find((value, index) => {
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
    data[userId].instructors[foundIndex] = instructor
    try {
        await writeFile(dataPath, JSON.stringify(data), { encoding: "utf-8" })
        return res.redirect(`instructors/${id}`)
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Sorry, we're facing some problems in the server."
        })
    }
}
module.exports.delete = async function (req, res) {
    let data
    const { id } = req.body
    const dataPath = resolve(process.cwd(), "./data.json")
    const userId = cookieParser(req.headers.cookie)["user_id_3000"]

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Server internal error."
        })
    }

    //Tratando o erro caso o usuário tente excluir o instrutor mais de uma vez
    let foundIndex = data[userId].instructors.findIndex((value) => value.id === id)
    try {
        if (foundIndex < 0) throw new Error("Error 404: the instrutor was already deleted.")
    } catch (error) {
        return res
            .status(404)
            .render("./errors.njk", { status: "Error 404", msg: "instructor was already deleted." })
    }

    data[userId].instructors.splice(foundIndex, 1)

    //Reescrevendo o arquivo data.json
    try {
        await writeFile(dataPath, JSON.stringify(data), { encoding: "utf-8" })
        return res.redirect(`/instructors`)
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Error 500",
            msg: "Sorry, we're facing some problems in the server."
        })
    }
}
