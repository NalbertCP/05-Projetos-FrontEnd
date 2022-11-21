export default class PokemonsData {
    constructor(url) {
        this.url = url
    }

    async requestData() {
        this.pokemons = await (await fetch(this.url)).json()
        this.createPokemonTypes()
    }

    createPokemonTypes() {
        let types = []
        for (let { type } of this.pokemons) {
            types.push(...type)
        }
        this.pokemonTypes = ["Todos", ...new Set(types)]
    }
}
