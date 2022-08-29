
const closeFaqButtons = document.querySelectorAll(".open-card-button")

let allFaqAnswers = []
let targetAnswer
let targetIndex

for (let button of closeFaqButtons){
    button.addEventListener("click",(event)=>{
        getArrayOfAnswers()
        if (button.classList[2]==="active"){
            hideTergetAnswer(button)
        }else {
            targetAnswer = event.target.nextElementSibling
            targetIndex = allFaqAnswers.indexOf(targetAnswer)
            closeAllFaqsAnswers(event)
            showTargetAnswer(button)
        }
    })
}

function getArrayOfAnswers(){
    allFaqAnswers = Array.from(document.querySelectorAll(".card-content"))
}
function hideTergetAnswer(button){
    event.target.nextElementSibling.classList.add("content-hidden")
    event.target.children[1].classList.remove("rotate")
    button.classList.remove("active")
}
function showTargetAnswer(button){
    button.classList.add("active")
    event.target.children[1].classList.add("rotate")
    event.target.nextElementSibling.classList.remove("content-hidden")
    
}
function closeAllFaqsAnswers (event){
    allFaqAnswers.forEach((answer,index)=>{
        if (answer.classList[1]!= "hidden-content" && index!=targetIndex)
        answer.classList.add("content-hidden")
    })
    closeFaqButtons.forEach((button)=>{
        button.classList.remove("active")
        button.children[1].classList.remove("rotate")
    })
}   




