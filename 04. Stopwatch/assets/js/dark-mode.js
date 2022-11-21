/*Variáveis*/
const documentBody = document.querySelector("body")
const switchModeButton = document.querySelector(".switch-theme > input")
const switchModeIcon = document.querySelector(".switch-theme i")
const simbols = document.querySelectorAll("i.material-icons")
const watchDisplay = document.querySelector(".watch")

/*Event listeners*/
switchModeButton.addEventListener("click", darkMode)

/*Funções*/
function darkMode(event) {
    //Alterando o ícone do botão "switch mode"
    const checked = event.target.checked
    checked ? (switchModeIcon.innerHTML = "light_mode") : (switchModeIcon.innerHTML = "dark_mode")

    //Alterando a cor dos ícones
    for (let simbol of simbols) {
        simbol.classList.toggle("white")
    }

    documentBody.classList.toggle("dark-mode") //Alterando as cores settadas no body
    watchDisplay.classList.toggle("dark-mode") // Acrescentandodo animação light no display do relógio
}
