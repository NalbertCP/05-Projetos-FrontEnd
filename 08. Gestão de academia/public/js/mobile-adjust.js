export function checkWidth (){
    const cardContainer = document.querySelector(".card-container")
    const cardImage = document.querySelector(".card-image")
    if(window.innerWidth<=950){
        if (cardImage)
        cardContainer.style.background = cardImage.style.background
        hideBar()
    } else{
        cardContainer.style.background = "#f3f3f3"
        showBar()
    }
}
export function hideBar(){
    const header = document.querySelector("header")

    header.classList.add("hidden")
    header.querySelector(".hidemenu-button i").classList.remove("rotate")
    document.querySelector(".center-container").classList.add("hiddenContainer")
}
export function showBar(){
    const header = document.querySelector("header")

    header.querySelector(".hidemenu-button i").classList.add("rotate")
    header.classList.remove("hidden")
    document.querySelector(".center-container").classList.remove("hiddenContainer")
}
