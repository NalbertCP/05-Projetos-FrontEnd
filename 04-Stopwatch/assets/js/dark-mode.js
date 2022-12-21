/*Variáveis*/
const documentBody = document.querySelector("body")
const switchModeButton = document.querySelector(".switch-theme > input")
const switchModeIcon = document.querySelector(".switch-theme i")
const simbols = document.querySelectorAll("i.material-icons")
const watchDisplay = document.querySelector(".watch")

/*Event listeners*/
switchModeButton.onclick = switchMode

window.onload = function () {
    const mode = localStorage.getItem("theme")
    //Aplicando o thema do cronômetro ao inicar a aplicação com base no localStorage
    switch (mode) {
        case "dark":
            switchModeButton.checked = true
            applyMode(true)
            break
        case "light":
            switchModeButton.checked = false
            applyMode(false)
            break
        default:
            return
    }
}

/*Funções*/
function switchMode(event) {
    const checked = event.target.checked
    checked ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light")
    applyMode(checked)
}
function applyMode(checked) {
    if (checked) {
        switchModeIcon.innerHTML = "light_mode" //Alerando ícone do botão de tema
        for (let simbol of simbols) {
            simbol.classList.add("white")
        }
        documentBody.classList.add("dark-mode") //Alterando as cores settadas no body
        watchDisplay.classList.add("dark-mode") //Acrescentandodo animação light no display do relógio
    } else {
        switchModeIcon.innerHTML = "dark_mode" //Alerando ícone do botão de tema
        for (let simbol of simbols) {
            simbol.classList.remove("white")
        }
        documentBody.classList.remove("dark-mode") //Alterando as cores settadas no body
        watchDisplay.classList.remove("dark-mode") //Acrescentandodo animação light no display do relógio
    }
}
