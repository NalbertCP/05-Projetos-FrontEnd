export async function main(){
   const data = await ((await fetch("/data")).json())
   const path = window.location.pathname.slice(1)
   if (path === "instructors") renderInstructors(data[path])
   if (path === "members") renderMembers(data[path])
}

/*Renderizando tabela de instrutores na página inicial*/
export function renderInstructors(instructors){
   const instructorServices = []
   const tableBody = document.querySelector("tbody")
   for (let instructor of instructors){
      const services = instructor.services.reduce((acc, value)=>{
         return acc+=`<span>${value}</span>`
      }, "")
      instructorServices.push(services)
   }

   tableBody.innerHTML = instructors.reduce((acc, instructor, index)=>{
      return acc+=`
         <tr class="person-data">
            <td>
               <img alt="${instructor.name} profile picutre" src="${instructor.avatar}">
               <span class="person-name">${instructor.name}</span>
            </td>
            <td>
               ${instructorServices[index]}
            </td>
            <td>
               <a class="flex" href="/instructors/${instructor.id}">
                  <i class="material-icons">visibility</i>
                  <span>Visualizar</span>
               </a>
            </td>
         </tr>
      `
   }, "")
}
/*Renderizando tabela de membros na página inicial*/
export function renderMembers(members){
   const tableBody = document.querySelector("tbody")
   tableBody.innerHTML = members.reduce((acc, member)=>{
      return acc+=`
         <tr class="person-data">
            <td>
               <img alt="${member.name} profile picutre" src="${member.avatar}">
               <span class="person-name">${member.name}</span>
            </td>
            <td>
               ${member.weight}kg
            </td>
            <td>
               ${member.height}m
            </td>
            <td>
               <a class="flex" href="/members/${member.id}">
                  <i class="material-icons">visibility</i>
                  <span>Visualizar</span>
               </a>
            </td>
         </tr>
      `
   }, "")
}
/*Atribuindo event listener ao filtro*/
export function activateFilter(nodes){
   const searchFilter = document.querySelector("#search")
   const tableBody = document.querySelector("tbody")
   
   searchFilter.addEventListener("input", ()=>{
      tableBody.innerHTML = ""
      const filteredNodes = nodes.filter((node)=>{
         const input = searchFilter.value.toUpperCase()
         const personName = node.querySelector(".person-name").innerHTML.toUpperCase()
         return personName.match(input)
      })
      tableBody.append(...filteredNodes)
   })
}
