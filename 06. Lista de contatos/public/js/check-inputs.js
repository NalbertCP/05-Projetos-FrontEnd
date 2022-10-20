//Selecioando todos os inputs do formulário
const formInputs = document.querySelectorAll("form .input")
const tellInput = document.querySelector("#number")
const stateInput = document.querySelector("#state")

//Modificado o aviso de preenchimento do campo para cada input
for (let input of formInputs){
    input.addEventListener("invalid", invalidInput)
    input.addEventListener("change", validInput)
}

tellInput.addEventListener("input", fromatPhoneInput)
stateInput.addEventListener("input", formatStateInput)

//Funções
function invalidInput(){
    this.setCustomValidity("Por favor, preencha o campo ou digite um valor válido")
}
function validInput(){
    this.setCustomValidity("")
}
function fromatPhoneInput(event){
    let length = tellInput.value.length
    tellInput.value = tellInput.value.replace(/\D/g, "").replace(/(\d{2})/,"($1) ")
    tellInput.value = tellInput.value.replace(/(\d{5})/,"$1-")

    if (event.inputType === "deleteContentBackward"){
        const lastCaracter = tellInput.value[length-1]
        length === 5 || length === 4 ? tellInput.value = tellInput.value.replace(/\D/g, "") : null
        try{
            lastCaracter.match(/\D/) ? tellInput.value = tellInput.value.replace(lastCaracter,""): null
        }catch(error){}
    }
}
function formatStateInput(){
    stateInput.value = stateInput.value.replace(/[^a-zA-Z]/g, "").toUpperCase()
}
