/* Importando variáveis e métodos*/
const { writeFile, readFile } = require("fs").promises
const { resolve } = require("path")
const { getAge, getBirthDate, cookieParser } = require("../utils/utils.js")

/*Métodos na CRUD de alunos */
module.exports.index = function (req, res) {
    res.render("./Members/index.njk")
}
module.exports.create = function (req, res) {
    res.render("./Members/create.njk")
}
module.exports.post = async function (req, res) {
    let data
    const keys = Object.keys(req.body)
    const dataPath = resolve(process.cwd(), "./data.json")
    const userId = cookieParser(req.headers.cookie)["user_id_3000"]

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Erro 500",
            msg: "Desculpe, tivemos um problema no servidor, tente novamente mais tarde."
        })
    }

    //Verificando se todos os campos foram preenchidos
    for (let key of keys) {
        try {
            if (req.body[key] === "")
                throw new Error("Erro 422: Por favor, preencha todos os campos do formulário.")
        } catch (error) {
            return res.status(422).render("./errors.njk", {
                status: "Erro 422",
                msg: "Por favor, preencha todos os campos do formulário."
            })
        }
    }

    //Tratando os dados do req.boby e adicionando novos dados
    let { birth } = req.body
    birth = Date.parse(birth)
    const id = Date.now().toString()
    const birthday = getBirthDate(birth).memberDate
    data[userId].members.push({
        id, // Não veio do req.body
        ...req.body,
        birth: birth,
        birthday // Não veio do req.body
    })

    //Atualizando o arquivo data.json com o cadastro do novo aluno
    try {
        await writeFile(dataPath, JSON.stringify(data), { encoding: "utf-8" })
        return res.redirect(`/members/${id}`)
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Erro 500",
            msg: "Desculpe, tivemos um problema no servidor, tente novamente mais tarde."
        })
    }
}
module.exports.findMember = async function (req, res) {
    let data
    let { id } = req.params
    const dataPath = resolve(process.cwd(), "./data.json")
    const userId = cookieParser(req.headers.cookie)["user_id_3000"]

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))[userId]
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Erro 500",
            msg: "Desculpe, tivemos um problema no servidor, tente novamente mais tarde."
        })
    }

    //Buscando o aluno em data.json com base no id recebido
    const foundMember = { ...data.members.find((value) => value.id == id) }
    try {
        if (Object.keys(foundMember).length === 0) {
            throw new Error("Erro 404: Aluno não encontrado.")
        }
    } catch (error) {
        return res
            .status(404)
            .render("./errors.njk", { status: "Erro 404", msg: "Aluno não encontrado." })
    }
    foundMember.age = getAge(Date.now(), foundMember.birth)

    return res.render("./Members/showmember.njk", { member: foundMember })
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
            status: "Erro 500",
            msg: "Desculpe, tivemos um problema no servidor, tente novamente mais tarde."
        })
    }

    //Buscando o aluno em data.json com base no id recebido
    const foundMember = data.members.find((value) => value.id == id)
    try {
        if (Object.keys(foundMember).length === 0) {
            throw new Error("Erro 404: Aluno não encontrado.")
        }
    } catch (error) {
        return res.status(404).render("./errors.njk", {
            status: "Erro 404",
            msg: "Aluno não encontrado."
        })
    }

    //Atualizando a idade do aluno em caso de aniversário
    const { birth } = foundMember
    const member = {
        ...foundMember,
        birth: getBirthDate(birth).iso
    }

    return res.render("./Members/edit.njk", { member })
}
module.exports.put = async function (req, res) {
    let data
    let foundIndex
    let { id, birth } = req.body
    const keys = Object.keys(req.body)
    const dataPath = resolve(process.cwd(), "./data.json")
    const userId = cookieParser(req.headers.cookie)["user_id_3000"]

    //Lendo o arquivo data.json
    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Erro 500",
            msg: "Desculpe, tivemos um problema no servidor, tente novamente mais tarde."
        })
    }

    //Verificando se todos os campos foram preenchidos
    for (let key of keys) {
        try {
            if (req.body[key] === "")
                throw new Error("Erro 422: Por favor, preencha todos os campos do formulário.")
        } catch (error) {
            return res.status(422).render("./errors.njk", {
                status: "Erro 422",
                msg: "Por favor, preencha todos os campos do formulário."
            })
        }
    }

    //Buscando aluno com base no ID
    const foundMember = data[userId].members.find((value, index) => {
        if (value.id == id) {
            foundIndex = index
            return value
        }
    })

    try {
        if (!foundMember) throw new Error("Erro 404: Aluno não encontrado.")
    } catch (error) {
        return res
            .status(404)
            .render("./errors.njk", { status: "Erro 404", msg: "Aluno não encontrado." })
    }

    //Atualizando os dados do aluno
    const birthday = getBirthDate(birth).memberDate
    let member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(birth),
        birthday: birthday
    }

    //Atualizando os dados do aluno e reescrevendo o data.json
    data[userId].members[foundIndex] = member
    try {
        await writeFile(dataPath, JSON.stringify(data), { encoding: "utf-8" })
        return res.redirect(`members/${id}`)
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Erro 500",
            msg: "Desculpe, tivemos um problema no servidor, tente novamente mais tarde."
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
            status: "Erro 500",
            msg: "Desculpe, tivemos um problema no servidor, tente novamente mais tarde."
        })
    }

    //Tratando o erro caso o usuário tente excluir o aluno mais de uma vez
    let foundIndex = data[userId].members.findIndex((value) => value.id === id)
    try {
        if (foundIndex < 0) throw new Error("Erro 404: Aluno não encontrado.")
    } catch (error) {
        return res
            .status(404)
            .render("./errors.njk", { status: "Erro 404", msg: "Aluno não encontrado." })
    }

    data[userId].members.splice(foundIndex, 1)

    //Reescrevendo o arquivo data.json
    try {
        await writeFile(dataPath, JSON.stringify(data), { encoding: "utf-8" })
        return res.redirect("/members")
    } catch (error) {
        return res.status(500).render("./errors.njk", {
            status: "Erro 500",
            msg: "Desculpe, tivemos um problema no servidor, tente novamente mais tarde."
        })
    }
}
