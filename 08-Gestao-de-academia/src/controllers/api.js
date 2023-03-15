const { resolve } = require("path")
const { readFile } = require("fs").promises
const { cookieParser } = require("../utils/utils")

module.exports.getData = async function (req, res) {
    let data
    const userId = cookieParser(req.headers.cookie)["user_id_3000"]
    const dataPath = resolve(process.cwd(), "./data.json")

    try {
        data = JSON.parse(await readFile(dataPath, { encoding: "utf-8" }))[userId]
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Error 500: server internal error." })
    }

    res.setHeader("Cache-Control", "private, no-cache")
    res.json(data)
}
