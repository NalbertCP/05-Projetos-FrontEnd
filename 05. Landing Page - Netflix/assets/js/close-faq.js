const faqsContainer = document.querySelector(".faq-cards")
let targetParent = ""
let targetParentId = ""

faqsContainer.addEventListener("click",(event)=>{
    targetParent = event.target.parentElement
    targetParentId = targetParent.id
    if (targetParent.className === "card"){
        closeLastOpenedFAQ()
        toggleFAQ(event.target)
    } 
})

function closeLastOpenedFAQ(){
    for (let faqHeader of document.querySelectorAll(".open-card-button")){
        const id = faqHeader.parentElement.id
        if (faqHeader.classList[2]==="active" && id!=targetParentId) closeFAQ(faqHeader)
    }
}
function toggleFAQ(faqHeader){
    faqHeader.classList.toggle("active")
    faqHeader.querySelector(".material-icons").classList.toggle("rotate")
    faqHeader.nextElementSibling.classList.toggle("content-hidden")
}
function closeFAQ(faqHeader){
    faqHeader.classList.remove("active")
    faqHeader.querySelector(".material-icons").classList.remove("rotate")
    faqHeader.nextElementSibling.classList.add("content-hidden")
}
