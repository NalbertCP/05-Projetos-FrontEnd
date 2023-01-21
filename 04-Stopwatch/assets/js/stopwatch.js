/*Variáveis temporais*/
let dec = "00",
    sec = "00",
    min = "00",
    hour = "00"

/*Variáveis de apoio*/
let interval
let lapTimeArray = []
let cont = 0

/*Elementos HTML de dentro do relógio*/
const decimals = document.querySelector(".dec")
const seconds = document.querySelector(".sec")
const minutes = document.querySelector(".min")
const hours = document.querySelector(".hour")

/*Botões e elementos da lap table*/
const startPauseButton = document.querySelector("#start-pause")
const stopButton = document.querySelector("#stop-button")
const lapButton = document.querySelector("#lap-button")
const tBody = document.querySelector("tbody")

/*Event listeners*/
startPauseButton.addEventListener("click", startPause)
stopButton.addEventListener("click", stop)
lapButton.addEventListener("click", registerLap)

/* Funções utilizadas dentro do relógio*/
function incrementNumbers() {
    dec = Number(dec) + 1
    if (dec > 99) dec = 0
    dec = dec.toLocaleString("pt-br", { minimumIntegerDigits: 2 })
    decimals.innerHTML = dec

    if (dec === "00") sec = Number(sec) + 1
    if (sec > 59) sec = 0
    sec = sec.toLocaleString("pt-br", { minimumIntegerDigits: 2 })
    seconds.innerHTML = sec

    if (sec === "00" && dec === "00") min = Number(min) + 1
    if (min > 59) min = 0
    min = min.toLocaleString("pt-br", { minimumIntegerDigits: 2 })
    minutes.innerHTML = min

    if (min === "00" && sec === "00" && dec === "00") hour = Number(hour) + 1
    hour = hour.toLocaleString("pt-br", { minimumIntegerDigits: 2 })
    hours.innerHTML = hour
}
function stopWatch() {
    interval = setInterval(() => {
        incrementNumbers()
    }, 10)
}
function stop() {
    clearInterval(interval)
    deleteLapsRow()
    const numbers = document.querySelectorAll(".number")
    for (let number of numbers) {
        number.innerHTML = "00"
    }
    startPauseButton.value = "start"
    startPauseButton.querySelector("span").innerHTML = "Start"
    startPauseButton.querySelector("i").innerHTML = "play_arrow"
    startPauseButton.querySelector("i").classList.remove("paused")
    dec = "00"
    sec = "00"
    min = "00"
    hour = "00"
}
function startPause() {
    startPauseButton.querySelector("i").classList.toggle("paused")
    if (startPauseButton.value === "start") {
        stopWatch()
        startPauseButton.value = "paused"
        startPauseButton.querySelector("span").innerHTML = "Pause"
        startPauseButton.querySelector("i").innerHTML = "pause"
    } else {
        clearInterval(interval)
        startPauseButton.value = "start"
        startPauseButton.querySelector("span").innerHTML = "Start"
        startPauseButton.querySelector("i").innerHTML = "play_arrow"
    }
}

/* Funções utilizadas dentro da lap table*/
function registerLap() {
    let centesimalSeconds =
        Number(dec) + Number(sec) * 100 + Number(min) * 100 * 60 + Number(hour) * 100 * 60 * 60
    let lapTime = centesimalSeconds
    lapTimeArray.push(centesimalSeconds)
    if (cont > 0) {
        lapTime = lapTimeArray[cont] - lapTimeArray[cont - 1]
    }

    let hours = Math.floor(lapTime / 360000).toLocaleString("pt-br", { minimumIntegerDigits: 2 })
    let minutes = (Math.floor(lapTime / 6000) % 60).toLocaleString("pt-br", {
        minimumIntegerDigits: 2
    })
    let seconds = (Math.floor(lapTime / 100) % 60).toLocaleString("pt-br", {
        minimumIntegerDigits: 2
    })
    let decimals = Math.ceil(lapTime % 100).toLocaleString("pt-br", { minimumIntegerDigits: 2 })

    const lapData = createLapsRow()
    lapData[0].innerHTML = `# ${(cont + 1).toLocaleString("pt-br", { minimumIntegerDigits: 2 })}`
    lapData[1].innerHTML = `${hours}:${minutes}:${seconds}.${decimals}`
    lapData[2].innerHTML = `${hour}:${min}:${sec}.${dec}`

    const tRow = document.createElement("tr")
    tRow.append(...lapData)
    tBody.appendChild(tRow)
    lapTime = 0
    cont++
}
function createLapsRow() {
    const tdArray = []
    for (let i = 0; i < 3; i++) {
        const td = document.createElement("td")
        tdArray.push(td)
    }
    return tdArray
}
function deleteLapsRow() {
    lapTimeArray = []
    cont = 0
    tBody.querySelectorAll("tr").forEach((value) => {
        value.remove()
    })
}
