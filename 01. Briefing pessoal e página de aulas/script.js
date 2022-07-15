const modaloverlay = document.querySelector(".modal_overlay")
const cardsimg = document.querySelectorAll(".card img")
const closemodal = document.querySelector(".material-icons")
const cards = document.querySelectorAll(".card")

/* ATIVAR O MODAL */
for (let cardimg of cardsimg){
    cardimg.addEventListener("click", function(){
        modaloverlay.classList.add("active")
        closemodal.classList.add("material-icons")
        modaloverlay.querySelector("iframe").src=`https://www.youtube.com/embed/${cardimg.id}`
    })   
}

/* ATIVAR E DESATIVAS A FEATURED*/
for (let card of cards){
    card.addEventListener("mouseover",()=>{
        card.classList.add("card_featured")
        let featured = card.querySelector(".featured")
        featured.innerHTML = "Featured"
        featured.classList.add("active")
    })
    card.addEventListener("mouseleave",()=>{
        let featured = card.querySelector(".featured")
        card.classList.remove("card_featured")
        featured.innerHTML = ""
        featured.classList.remove("active")
    })
}

/* DESATIVAR O MODAL */
closemodal.addEventListener("click", function(){
    modaloverlay.classList.remove("active")
    closemodal.classList.remove("material-icons")
    modaloverlay.querySelector("iframe").src=""
})
