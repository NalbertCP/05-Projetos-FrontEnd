/*Variáveis gerais*/
const input = document.querySelector("#text-input")
const taskList = document.querySelector(".task-list")
const createTaskButton = document.querySelector(".create-task")

/* Atributos dos elementos html presentes em cada task*/
const deleteButtonAttr = {class:"delete-btn", value:"taskdelete", onclick:"deleteTask(event)"}
const deleteIconAttr={class:"delete-icon", src:"./img/delete-task-icon.svg", alt:"delet-icon"}
const doneButtonAttr = {class:"done-btn", value:"taskdone", onclick:"taskDone(event)"}
const doneIconAttr={class:"done-icon", src:"./img/done-task-icon.svg", alt:"done-icon"}

createTaskButton.addEventListener("click",()=>{
    if (input.value!=""){
        createTask()
        setTimeout(()=>{
            input.value = ""
        },50)
    }
})

/* Criando os ícones que irão dentro de cada botão*/
function createIcons(){
    const deleteIcon = document.createElement("img")
    for (let attr in deleteIconAttr){
        deleteIcon.setAttribute(attr, deleteIconAttr[attr])
    }
    const doneIcon = document.createElement("img")
    for (let attr in doneIconAttr){
       doneIcon.setAttribute(attr, doneIconAttr[attr])
    }

    return [deleteIcon, doneIcon]
}
/* Criando os botões que irão dentro de cada task*/
function createButtons(){
    const deleteBtn = document.createElement("button")
    for (let attr in deleteButtonAttr){
        deleteBtn.setAttribute(attr, deleteButtonAttr[attr])
    }
    deleteBtn.appendChild(createIcons()[0])

    const doneBtn = document.createElement("button")
    for (let attr in doneButtonAttr){
        doneBtn.setAttribute(attr, doneButtonAttr[attr])
    }
    doneBtn.appendChild(createIcons()[1])

    return [deleteBtn, doneBtn]
}
/* Criando task com base no input do formulário*/
function createTask (){
    const taskName = document.createElement("span")
    taskName.setAttribute("class","task-name")
    taskName.innerText = input.value

    const before = document.createElement("span")
    before.setAttribute("class","before")

    const buttonsContainer = document.createElement("div")
    buttonsContainer.setAttribute("class","task-buttons")
    for (let button of createButtons()){
        buttonsContainer.appendChild(button)
    }

    const task = document.createElement("div")
    task.setAttribute("class","task")
    task.append(before, taskName, buttonsContainer)
    taskList.appendChild(task)
}
/* Deletando a task ao clicar no botão "trash" */
function deleteTask(event){
    const taskParent = event.target.parentNode.parentNode
    taskParent.style.animation = "deleteTask 0.8s forwards"
    setTimeout(()=>{
        taskParent.remove()
    },500)

}
/* Marcando a task como concluída */
function taskDone(event){
    const taskParent = event.target.parentNode.parentNode
    const doneButton = document.querySelector(".done-btn")
    const before = taskParent.querySelector(".before")
    const taskName = taskParent.querySelector(".task-name")
    
    if (doneButton.value=="taskdone") {
        before.classList.add("done")
        taskName.classList.add("done")
        doneButton.value=""
    } else {
        before.classList.remove("done")
        taskName.classList.remove("done")
        doneButton.value="taskdone"
    }
}