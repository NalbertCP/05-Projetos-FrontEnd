const ioptions = document.querySelectorAll(".iselect option")
const foptions = document.querySelectorAll(".fselect option")
const inputs = document.querySelectorAll(".inputs")

/*UNITS SIMBOLS WICH ARE GONNA BE USED AS VALUE IN THE OPTIONS TAG*/
const units = [
    ["mg","g","kg","ton","lb","@"],
    ["mm","cm","m","km","ft","pol"],
    ["s","min","h","dia","sem","mês","ano"],
]
/*UNITS NAMES WICH ARE GONNA BE USED AS THE INNER HTML IN THE OPTIONS TAG*/
const unitnames = [
    ["miligrama","grama","quilograma","tonelada","libra","arroba"],
    ["milimetro","centímetro","metro","quilômetro","pé","polegada"],
    ["segundo","minuto","hora","dia","semana","mês","ano"],
]
/*UNIT CONVERTER CONSTANTS WICH ARE GONNA BE USED TO CALCULATE THE CONVERSION*/
const unitratios = [
    [1000,1,0.001,0.000001, 0.00220462, 0.000066667],
    [1000, 100, 1, 0.001, 3.28084, 39.3701],
    [86400, 1440, 24, 1, 0.142857, 0.0328767, 0.00273973]
]

/*CHOOSING THE TYPE OF UNITS*/
document.querySelector(".selecttype").addEventListener("click",()=>{
    const selectunit = Number(document.querySelector(".selecttype").value)
    for (let input of inputs){
        input.value=""
    }
    for (let option of ioptions){
        option.style.display="block"
        option.value = ""
        option.innerHTML = ""
    }
    for (let option of foptions){
        option.style.display="block"
        option.value = ""
        option.innerHTML = ""
    }
    for(let i=0; i<units[selectunit].length; i++){
        ioptions[i].value = units[selectunit][i]
        ioptions[i].innerHTML = unitnames[selectunit][i]
        foptions[i].value = units[selectunit][i]
        foptions[i].innerHTML = unitnames[selectunit][i]
    }
})

document.querySelector("#initial").addEventListener("keyup", leftright_converter)
document.querySelector("#final").addEventListener("keyup",rightleft_converter)
document.querySelector(".iselect").addEventListener("click",leftright_converter)
document.querySelector(".fselect").addEventListener("click",leftright_converter)

function simbol(units){
    const selectunit = Number(document.querySelector(".selecttype").value)
    const unitsimbol = [...units[selectunit]]
    return unitsimbol
}
function ratios(unitratios){
    const selectunit = Number(document.querySelector(".selecttype").value)
    const constunits = [...unitratios[selectunit]]
    return constunits
}

function leftright_converter(){
    const initial = document.querySelector("#initial")
    const final = document.querySelector("#final")
    const valor = initial.value
    final.value = valor*ratio()
}
function rightleft_converter(){
    const initial = document.querySelector("#initial")
    const final = document.querySelector("#final")
    const valor =final.value
    initial.value = valor/ratio()
}
function ratio (){
    const isimbol = document.querySelector(".iselect").value
    const fsimbol = document.querySelector(".fselect").value
    const iindex = simbol(units).indexOf(isimbol)
    const findex = simbol(units).indexOf(fsimbol)
    const ratio = ratios(unitratios)[findex]/ratios(unitratios)[iindex]
    return ratio
}
    