/*Criando filtros da pokedex*/
export function createFilters(arrayOfTypes){
    let pokemonTypeOptions = ""
    for (let type of arrayOfTypes){
        pokemonTypeOptions+=`<option value="${type}">${type}</option>`
    }
    return`<div class="filter">
        <label for="name">Nome:</label>
        <input autocomplete="off" type="text" name="name" id="name">
    </div>
    <div class="filter">
        <label for="type">Tipo:</label>
        <select name="type" id="type">
            ${pokemonTypeOptions}
        </select>
    </div>
    <div class="filter">
        <label for="sort">Ordenar:</label>
        <select name="sort" id="sort">
            <option value="l-to-h">Do menor para o maior Id</option>
            <option value="h-to-l">Do maior para o menor Id</option>
            <option value="a-to-z">De A à Z</option>
            <option value="z-to-a">De Z à A</option>
        </select>
    </div>`
}

/*Criando os cards e seus componentes*/
export function createPokemonCards(pokemon, types, stats){
    let id = `00${pokemon.id}`.slice(-3)
    let name = pokemon.name
    id = `#${id}`
    name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`

    return`
    <label class="card-label" id="${pokemon.name}" for="card${id.slice(-3)}">
        <input type="radio" name="card-click" id="card${id.slice(-3)}">
        <div class="card">
            <div class="w-100 flex card-img">
                <img src="${pokemon.imgUrl}"
                alt="${pokemon.name}-img">
            </div>
            <div class="w-100 card-info">
                <span class="card-number">${id}</span>
                <div class="pokemon-name">${name}</div>
                <div class="types">
                    ${types}
                </div>
            </div>
            ${stats}
        </div>
    </label>`
}
export function createCardsTypes(pokemon){
    let types = ""
    for(let type of pokemon.type){
        types+=`<span class="type ${type}">${type}</span>`
    }
    return types
}
export function createCardsStats(pokemon){
    let total = Number(pokemon.stats.total)
    let stats = ""

    for (let [stat, value] of Object.entries(pokemon.stats)){
        let width = `${Math.floor(Number(value)*100/total)+5}%`
        if (stat!="total")
        stats+=
        `<div class="w-100 flex pokemon-stats">
            <div class="stat-name">${stat}</div>
            <div class="stat-bar">
                <div class="stat-number" style="width:${width}">${value}</div>
            </div>
        </div>`
    }
    return `<div class="w-100 more-info">${stats}</div>`
}
export function notFoundDiv(){
    return`<div class="flex not-found">
                <span>Pokemon não encontrado</span>
                <span class="material-symbols-outlined">sentiment_dissatisfied</span>
            </div>`
}

/*Exibindo cards e filtros de forma suave*/
export function showCards(){
    const arrayOfCards = document.querySelectorAll(".card-label")
    for (let i=0; i<arrayOfCards.length; i++){
        setTimeout(()=>{
            arrayOfCards[i].classList.add("show-card")
        },10*i)
    }
}
export function showFilters(){
    setTimeout(()=>{
        const filtersContainer = document.querySelector(".filters-container")
        filtersContainer.classList.add("show-filters")
    })
}
