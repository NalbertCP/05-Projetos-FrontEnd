/*Selecionando elementos do DOM*/
const emailInputs = document.querySelectorAll("input[type=email]")

/*Movendo a label para o topo do input quando input.value!=""*/
for (let input of emailInputs){
    input.addEventListener("keyup", (event)=>{
        input.value ? event.target.nextElementSibling.classList.add("label-goup"): 
        event.target.nextElementSibling.classList.remove("label-goup")
    })
}
