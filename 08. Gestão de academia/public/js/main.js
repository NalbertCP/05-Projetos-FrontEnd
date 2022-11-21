//Importando funções
import hideLoadOverlay from "./load-effect.js"
import * as mobileAdjust from "./mobile-adjust.js"
import * as renderElements from "./render-data.js"
const hideMenuButton = document.querySelector(".hidemenu-button")

//Alterando a disposição das imagens para o layout mobile
window.onresize = mobileAdjust.checkWidth

//Renderizando instrutores e membros e removendo efeito de loading
window.onload = async function () {
    const path = window.location.pathname.slice(1)
    const dataNodes = []
    if (path === "instructors" || path === "members") {
        try {
            await renderElements.main()
        } catch (error) {
            console.log(error)
            window.alert("Something went wrong. Please reaload the page.")
        }
        dataNodes.push.apply(dataNodes, document.querySelectorAll(".person-data"))
        renderElements.activateFilter(dataNodes)
    }
    mobileAdjust.checkWidth()
    hideLoadOverlay()
}

//Aplicando efeito toggle ao menu
hideMenuButton.addEventListener("click", () => {
    if (hideMenuButton.value == "desable") {
        mobileAdjust.showBar()
        hideMenuButton.value = "active"
    } else {
        mobileAdjust.hideBar()
        hideMenuButton.value = "desable"
    }
})
