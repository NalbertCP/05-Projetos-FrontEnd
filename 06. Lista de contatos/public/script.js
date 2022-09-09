//Selecionando os elementos html
const contacts = document.querySelectorAll(".contact")
const searchInput = document.querySelector("#search")
const searchLabel = document.querySelector(".search-bar label")

window.onload = slideContacts
searchInput.addEventListener("input",moveLabel)

//Função para manter a label acima do input caso input.value !=""
function moveLabel (){
    searchInput.value? searchLabel.classList.add("movelabel")
    : searchLabel.classList.remove("movelabel")
}

//Criando o efeito de slide em cascata dos contatos
function slideContacts(){
    contacts.forEach((contact, index)=>{
        contact.style.animationDelay = (0.2*index+"s").toString()
    })
}