/*Variáveis gerais*/
const modal = document.querySelector(".modal-overlay")
const textInput = document.querySelector("#text-input")
const createTaskBtn = document.querySelector(".create-task")

modal.addEventListener("click", closeModal)
createTaskBtn.addEventListener("click", activateModal)

/*Fechando o modal ao clicar em "Fechar" ou no "X"*/
function closeModal (event){
    const targetName = event.target.className
    if (targetName == "close-icon" || targetName == "close-modal"){
        modal.classList.remove("active")
    }
}
/*Ativando o modal caso input.value esteja vazio*/
function activateModal (){
    if (textInput.value === "") modal.classList.add("active")
}
