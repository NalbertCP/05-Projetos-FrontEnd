import PokemonsData from "./model.js"
import * as views from "./virtualViews.js"

const pokemonsContainer = document.querySelector(".pokemons-container")
let pokemonCards = []
let filters = {
    name:"", 
    type:"Todos", 
    sort:"l-to-h"
}
let nameFilterElement="", typeFilterElement="", sortFilterElement=""

main()

/*Função principal (executa todas as outras)*/
async function main(){
    const allPokemonsData = new PokemonsData("./pokemons.json")
    await allPokemonsData.requestData()
    renderVirtualViews(allPokemonsData)
}

/*Rendrizando os elementos(nodes DOM) vindos de virtualViews.js*/
function renderVirtualViews(data){ 
    desableLoadEffect() //Desabilitando a página de loading

    //Renderizando filtros no DOM
    const filtersForm = document.querySelector("form")
    const allFilters = views.createFilters(data.pokemonTypes)
    filtersForm.innerHTML=allFilters
    createFiltersListeners() //Atribuindo eventListeners aos filtros
        
    //Renderizando os cards de pokemons no DOM
    for (let pokemon of data.pokemons){
        const types = views.createCardsTypes(pokemon)
        const stats = views.createCardsStats(pokemon)
        pokemonsContainer.innerHTML += views.createPokemonCards(pokemon, types, stats)
    }

    //Criando um array dos cards para que eu consiga filtra-los depois
    pokemonCards = Array.from(document.querySelectorAll(".card"))

    //Exibindo cards e filtros de forma suave
    views.showCards()
    views.showFilters()
}
function desableLoadEffect(){
    const loadOverlay = document.querySelector(".load-overlay")
    loadOverlay.classList.add("desabled")
    loadOverlay.querySelector(".pokeball-load").style.animationPlayState = "paused"
    loadOverlay.querySelector(".pokeball-shadow").style.animationPlayState = "paused"
}

/*Filtrando e ordenando os cards*/
function createFiltersListeners(){
    nameFilterElement = document.querySelector("input[type=text]")
    nameFilterElement.addEventListener("keyup", allFiltersEvents)

    typeFilterElement = document.querySelector("select#type")
    typeFilterElement.addEventListener("change", allFiltersEvents)

    sortFilterElement = document.querySelector("select#sort")
    sortFilterElement.addEventListener("change", allFiltersEvents)
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
        return pokemon.id.slice(0, filters.name.length)===filters.name
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
    filteredCards.sort((a, b)=>{
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
    if (filteredCards.length===0) pokemonsContainer.innerHTML += views.notFoundDiv()
    else pokemonsContainer.append(...filteredCards)
}

