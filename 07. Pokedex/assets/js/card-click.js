/*Escondendo as estatísticas dos card ao clicar fora dele*/
let cardClicked = ""
window.addEventListener("click",(event)=>{
    if (event.target.name==="card-click"){
        cardClicked = event.target
    } else{
        cardClicked.checked = false
    }
})
