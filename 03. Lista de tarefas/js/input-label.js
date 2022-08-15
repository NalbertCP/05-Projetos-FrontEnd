/*Variáveis gerais*/
const taskInput = document.querySelector("#text-input")
const inputLabel = document.querySelector("#text-input + label")

taskInput.addEventListener("keyup",()=>{
    /* Se input.value estiver vazio, a label volta para baixo, caso contrário, permanece em cima do input*/
    taskInput.value? inputLabel.className="move-label": inputLabel.className=""
})