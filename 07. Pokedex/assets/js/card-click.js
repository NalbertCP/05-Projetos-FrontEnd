/*Declarando variáveis*/
let cardTarget = ""
let form = document.querySelector("form")

/*Cancelando o submit do form que contém os filtros*/
form.addEventListener("submit", (event)=>{
    event.preventDefault()
})

/*Criando efeito de animação do card ao clica-lo*/
window.addEventListener("click", animateCard)

/*Funções*/
function animateCard(event){
    cardTarget? setCardAsUnclicked() : ""
    event.target.classList[1] === "card"? setCardAsClicked(event) : ""
}
function setCardAsClicked(event){
    cardTarget = event.target
    cardTarget.querySelector(".card-img").classList.add("move-img")
    cardTarget.querySelector(".card-info").classList.add("move-info")
    cardTarget.querySelector(".more-info").classList.add("show")
}
function setCardAsUnclicked(){
    cardTarget.querySelector(".card-img").classList.remove("move-img")
    cardTarget.querySelector(".card-info").classList.remove("move-info")
    cardTarget.querySelector(".more-info").classList.remove("show")
}
