/* variáveis do display, números e operadores*/
const display = document.querySelector(".display")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector("#equal")
const clear = document.querySelector("#clear")

/*Modal*/
const modalOverlay = document.querySelector(".modal-overlay")
const hideModal = document.querySelector(".closemodal")
const modalWarning = document.querySelector(".text")

/*Adicionando números e operadores no display*/
addNumbers()
addOperators()

/*Exbindo o resultado, limpando o display e fechando o modal*/
equal.addEventListener("click",showResult)
clear.addEventListener("click",clearDisplay)
modalOverlay.addEventListener("click",closeModal)

/* Funções utilizadas */
function addNumbers (){
    for (let number of numbers){
        number.addEventListener("click",()=>display.value += number.value)
    }
}
function addOperators(){
    for (let operator of operators){
        operator.addEventListener("click",()=>{
            console.log(operator.value)
            display.value += ` ${operator.value} `  
        })
    }
}
function showResult(){
    if (display.value == "undefined" || display.value == ""){
        hideModal.classList.add("closemodal")
        modalWarning.innerHTML = "Por favor, digite uma operação antes de solicitar o resultado"
        display.value=""
        modalOverlay.classList.add("active")
    } else{
        display.value = eval(display.value)
    }
}
function clearDisplay(){
    display.value=""
}
function closeModal (event){
    if(event.target.className =="closemodal" || event.target.className =="modal-overlay active"){
        modalOverlay.classList.remove("active")
        hideModal.classList.remove("closemodal")
    }
}
