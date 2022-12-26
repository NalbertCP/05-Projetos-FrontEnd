/*Variáveis gerais*/
const form = document.querySelector("form")
const tasksList = document.getElementsByClassName("task-list")[0]
const modal = document.querySelector(".modal-overlay")

/*Ouvintes de eventos*/
form.addEventListener("submit", formHandler)
tasksList.addEventListener("click", taskHandler)
modal.addEventListener("click", closeModal)

function formHandler(event) {
    event.preventDefault()
    const input = event.target["text-input"]
    if (input.value === "") return modal.classList.add("active")
    appendNewTask(input)
}
function closeModal(event) {
    const targetName = event.target.className
    if (targetName == "close-icon" || targetName == "close-modal") {
        modal.classList.remove("active")
    }
}

//Adicionando uma nova tarefa ao DOM
function appendNewTask(input) {
    const myInput = input
    const task = input.value
    tasksList.appendChild(createNewTask(task))
    myInput.value = ""
}
function createNewTask(task) {
    const taskContainer = document.createElement("div")
    taskContainer.setAttribute("class", "task")
    taskContainer.innerHTML = `
        <span class="before"></span>
        <span class="task-name">${task}</span>
        <div class="task-buttons">
            <button type="button" class="delete-btn" value="taskdelete">
                <img class="delete-icon" src="./img/delete-task-icon.svg" alt="delete task icon"/>
            </button>
            <button type="button" class="done-btn" value="taskdone">
                <img class="done-icon" src="./img/done-task-icon.svg" alt="done task icon"/>
            </button>
        </div>`
    return taskContainer
}

//Verificando se o usuário marcou a tarefa como concluída ou a deletou
function taskHandler(event) {
    const target = event.target
    if (target.className === "delete-btn") {
        deleteTask(target)
        return
    } else if (target.className === "done-btn") {
        taskDone(target)
        return
    }
}
function deleteTask(deleteButton) {
    const task = deleteButton.parentElement.parentElement
    task.classList.add("delete-task")
    setTimeout(() => {
        task.remove()
    }, 500)
}
function taskDone(doneButton) {
    const button = doneButton
    const task = doneButton.parentElement.parentElement
    const before = task.querySelector(".before")
    const taskName = task.querySelector(".task-name")

    if (doneButton.value == "taskdone") {
        before.classList.add("done")
        taskName.classList.add("done")
        button.value = ""
    } else {
        before.classList.remove("done")
        taskName.classList.remove("done")
        button.value = "taskdone"
    }
}
