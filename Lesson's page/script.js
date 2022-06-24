const modaloverlay = document.querySelector(".modal_overlay")
const cards = document.querySelectorAll(".card img")
const closemodal = document.querySelector(".material-icons")

for (let card of cards){
    card.addEventListener("click", function(){
        modaloverlay.classList.add("active")
        closemodal.classList.add("material-icons")
        modaloverlay.querySelector("iframe").src=`https://www.youtube.com/embed/${card.id}`
    })
}

closemodal.addEventListener("click", function(){
    modaloverlay.classList.remove("active")
    closemodal.classList.remove("material-icons")
    modaloverlay.querySelector("iframe").src=""

})

