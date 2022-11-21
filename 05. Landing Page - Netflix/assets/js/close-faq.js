/*Selecionando o container de FAQs no DOM*/
const faqsContainer = document.querySelector(".faq-cards")

/*Declarando variáveis auxiliares*/
let targetParent = ""
let targetParentId = ""

/*Adicionado Event listener ao container de FAQs*/
faqsContainer.addEventListener("click", (event) => {
    targetParent = event.target.parentElement
    targetParentId = targetParent.id
    if (targetParent.className === "card") {
        closeLastOpenedFAQ()
        toggleFAQ(event.target)
    }
})

/*Funções utilizadas*/
function closeLastOpenedFAQ() {
    for (let faqHeader of document.querySelectorAll(".open-card-button")) {
        const id = faqHeader.parentElement.id
        if (faqHeader.classList.contains("active") && id != targetParentId) closeFAQ(faqHeader)
    }
}
function toggleFAQ(faqHeader) {
    faqHeader.classList.toggle("active")
    faqHeader.querySelector(".material-icons").classList.toggle("rotate")
    faqHeader.nextElementSibling.classList.toggle("content-hidden")
}
function closeFAQ(faqHeader) {
    faqHeader.classList.remove("active")
    faqHeader.querySelector(".material-icons").classList.remove("rotate")
    faqHeader.nextElementSibling.classList.add("content-hidden")
}
