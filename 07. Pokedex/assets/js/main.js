/*Importando funções de useful-funcs.mjs*/
import * as functions from "./useful-funcs.js"

/*Declarando variáveis gerais*/
const pokemonsContainer = document.querySelector(".pokemons-container")
let pokemonCards = [], pokemonTypes = []
let filters = {name:"", type:"Todos", sort:"l-to-h"}
let nameFilterElement="", typeFilterElement="", sortFilterElement=""

/*Request e consumo dos dados vindos de data.json*/
fetch("./pokemons.json").then(async(response)=>{
    let pokemons = await response.json()
    for (let {type} of pokemons){
        pokemonTypes.push(...type)
    }
    //Criando uma lista única de tipos de pokemons para o filtro de tipos
    pokemonTypes = ["Todos", ...new Set(pokemonTypes)]
    consumeData(pokemons)
})

/*Função principal (executa todas as outras)*/
function consumeData(pokemons){ 
    //Renderizando filtros no DOM
    const filtersForm = document.querySelector("form")
    const allFilters = functions.createFilters(pokemonTypes)
    filtersForm.innerHTML=allFilters

    //Limpando o array de tipos pois nao preciso mais dele
    pokemonTypes.length = 0

    //Renderizando os cards de pokemons no DOM
    for (let pokemon of pokemons){
        const types = functions.createCardsTypes(pokemon)
        const stats = functions.createCardsStats(pokemon)
        pokemonsContainer.innerHTML += functions.createPokemonCards(pokemon,types,stats)
    }

    //Criando um array dos cards para que eu consiga filtra-los depois
    pokemonCards = Array.from(document.querySelectorAll(".card"))

    //Exibindo cards e filtros de forma suave
    functions.showCards()
    functions.showFilters()

    //Atribuindo eventListeners aos filtros
    createFiltersListeners()
}

/*Filtrando e ordenando os cards*/
function createFiltersListeners(){
    nameFilterElement = document.querySelector("input[type=text]")
    nameFilterElement.addEventListener("keyup",allFiltersEvents)

    typeFilterElement = document.querySelector("select#type")
    typeFilterElement.addEventListener("change",allFiltersEvents)

    sortFilterElement = document.querySelector("select#sort")
    sortFilterElement.addEventListener("change",allFiltersEvents)
}
function allFiltersEvents (){
    let filteredCards = []
    filters.name = nameFilterElement.value.toLowerCase()
    filters.type = typeFilterElement.value
    filters.sort = sortFilterElement.value

    while(pokemonsContainer.lastElementChild){
        pokemonsContainer.removeChild(pokemonsContainer.lastElementChild)
    }

    //Filtrando cards pelo nome (1º filtro)
    filteredCards = pokemonCards.filter((pokemon)=>{
        return pokemon.id.slice(0,filters.name.length)===filters.name
    })

    //Filtrando cards pelo tipo (2º filtro)
    filteredCards = filteredCards.filter((pokemon)=>{
        let pokemonTypes = pokemon.querySelectorAll(".type")
        for (let pokeType of pokemonTypes){
            if (pokeType.innerHTML===filters.type) return true
            if (filters.type==="Todos") return true
        }
        return false
    })

    //Ordenando os cards (3º filtro)
    filteredCards.sort((a,b)=>{
        let cardNumberA = Number(a.querySelector(".card-number").innerHTML.slice(-3))
        let cardNumberB = Number(b.querySelector(".card-number").innerHTML.slice(-3))
        if (filters.sort === "l-to-h")
        return cardNumberA - cardNumberB
        
        if (filters.sort === "h-to-l")
        return cardNumberB - cardNumberA
        
        if (filters.sort === "a-to-z"){
            if (a.id<b.id) return -1
            if (a.id>b.id) return 1
            return 0
        }
        
        if (filters.sort === "z-to-a"){
            if (a.id>b.id) return -1
            if (a.id<b.id) return 1
            return 0
        }
    })

    //Inserindo cards filtrados no DOM ou aviso de "Not found"
    if (filteredCards.length===0) pokemonsContainer.innerHTML += functions.notFoundDiv()
    else pokemonsContainer.append(...filteredCards)
}
