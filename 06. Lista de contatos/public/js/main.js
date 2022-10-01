//Selecionando os elementos html
const contacts = document.querySelectorAll(".contact")

window.onload = slideContacts
searchInput.addEventListener("input", moveLabel)

//Criando o efeito de slide em cascata dos contatos
function slideContacts(){
    contacts.forEach((contact, index)=>{
        contact.style.animationDelay = (0.2*index+"s").toString()
    })
}
