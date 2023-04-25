const axios = require("axios").default
const { writeFile } = require("fs").promises

//Criando uma base de dados a partir da quantidade passada no terminal
createPokemonDataBase(process.argv)

async function createPokemonDataBase(nodeArray) {
    if (nodeArray.length > 3) return console.log("Only one parameter is allowed.")

    let pokemonNames = []
    let dataBase = []
    let totalPokemons = Number(nodeArray[2])
    totalPokemons > 1154 ? (totalPokemons = 1154) : ""

    if (!totalPokemons || typeof totalPokemons != "number")
        return console.log("It's necessary to specify the total of pokemons as a number.")

    console.log(`Creating a data-base with ${totalPokemons} pokemons...`)
    try {
        pokemonNames = await createPokemonList(totalPokemons)
        dataBase = await searchPokemonData(pokemonNames)
    } catch (error) {
        console.log(error.message + " during the search of pokemon name to create data base.")
    }

    try {
        await writeFile("./pokemons.json", JSON.stringify(dataBase, null, 4), { encoding: "utf-8" })
        console.log("Success! Check the data base with name 'pokemons.json' in this directory.")
        return
    } catch (error) {
        console.log(error.message)
        return
    }
}
async function createPokemonList(total) {
    let listOfNames = []
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${total}&offset=0`)
    for (let value of result.data.results) {
        listOfNames.push(value.name)
    }
    return listOfNames
}
async function searchPokemonData(pokemonNames) {
    let dataBase = []

    for (let name of pokemonNames) {
        let result = await (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data
        const pokemonStat = {
            id: result.id,
            name: result.name,
            type: [],
            stats: { total: 0 },
            imgUrl: result.sprites.other["official-artwork"].front_default
        }

        for (let { type } of result.types) {
            pokemonStat.type.push(type.name)
        }

        for (let { base_stat, stat } of result.stats) {
            stat.name === "special-attack" ? (stat.name = "spe-att") : ""
            stat.name === "special-defense" ? (stat.name = "spe-def") : ""
            pokemonStat.stats[stat.name] = base_stat
            pokemonStat.stats.total += Number(base_stat)
        }

        dataBase.push(pokemonStat)

        if (dataBase.length % 10 === 0) console.log(`${dataBase.length} pokemons searched.`)
    }
    return dataBase
}
