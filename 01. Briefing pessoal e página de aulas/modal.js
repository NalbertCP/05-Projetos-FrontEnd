const modaloverlay = document.querySelector(".modal-overlay")
const cardsimg = document.querySelectorAll(".card img")
const closemodal = document.querySelector(".material-icons")
const cards = document.querySelectorAll(".card")

for (let cardimg of cardsimg){
    cardimg.addEventListener("click", ()=>{
        showmodal(cardimg)
    })   
}
modaloverlay.addEventListener("click",hidemodal)

function showmodal (cardimg){
    modaloverlay.classList.add("active")
    closemodal.classList.add("material-icons")
    modaloverlay.querySelector("iframe").src=`https://www.youtube.com/embed/${cardimg.id}`
}
function hidemodal (event){
    if (event.target.className==="material-icons" || event.target.className==="modal-overlay active"){
        modaloverlay.classList.remove("active")
        closemodal.classList.remove("material-icons")
        modaloverlay.querySelector("iframe").src=""
    }
}
