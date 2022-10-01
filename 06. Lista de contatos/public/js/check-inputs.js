//Selecioando todos os inputs do formulário
const formInputs = document.querySelectorAll("form .input")

//Modificado o aviso de preenchimento do campo para cada input
for (let input of formInputs){
    input.addEventListener("invalid", invalidInput)
    input.addEventListener("change", validInput)
}

//Funções
function invalidInput(){
    this.setCustomValidity("Por favor, preencha o campo ou digite um valor válido")
}
function validInput(){
    this.setCustomValidity("")
}
