/*Declarando variáveis*/
var cardTarget = ""
var form = document.querySelector("form")

/*Cancelando o submit do form que contém os filtros*/
form.addEventListener("submit", function (event) {
    event.preventDefault()
})

/*Criando efeito de animação do card ao clica-lo*/
window.addEventListener("click", animateCard)

/*Funções*/
function animateCard(event) {
    cardTarget ? removeAnimation() : ""
    event.target.classList.contains("card") ? addAnimation(event) : ""
}
function addAnimation(event) {
    cardTarget = event.target
    cardTarget.querySelector(".card-img").classList.add("move-img")
    cardTarget.querySelector(".card-info").classList.add("move-info")
    cardTarget.querySelector(".more-info").classList.add("show")
}
function removeAnimation() {
    cardTarget.querySelector(".card-img").classList.remove("move-img")
    cardTarget.querySelector(".card-info").classList.remove("move-info")
    cardTarget.querySelector(".more-info").classList.remove("show")
}
