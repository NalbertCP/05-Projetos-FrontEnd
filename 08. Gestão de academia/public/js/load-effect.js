/*Desativando o efeito de loading após carregar a página*/
export default function hideLoadOverlay() {
    const overlay = document.querySelector(".load-overlay")
    const rotateLoad = overlay.querySelector(".rotate-load")

    overlay.classList.add("hidden")
    setTimeout(() => {
        rotateLoad.style.animationPlayState = "paused"
    }, 1000)
}
