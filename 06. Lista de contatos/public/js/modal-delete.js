//Selecionando os elementos html
const modal = document.querySelector(".modal-overlay")
const formDelete = document.querySelector(".form-delete")

//Ativando o modal após o submit do formulário
formDelete.onsubmit = function (event) {
    event.preventDefault()
    modal.classList.remove("modal-hidden")
}

//Verificando o cancelamento ou confirmação da delação ao interagir com o modal
modal.onclick = function (event) {
    let target = event.target
    if (target.className === "modal-delete") {
        formDelete.submit()
    } else if (target.className === "material-icons" || target.className === "cancel-delete") {
        modal.classList.add("modal-hidden")
    }
}
