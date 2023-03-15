//Selecionando os links do header
const headerLinks = document.querySelectorAll("nav a")

//Verificando se a URL contém o href do link, se sim, a link (tag a) fica em destaque
for (let link of headerLinks) {
    let linkHref = link.getAttribute("href")
    if (window.location.pathname.includes(linkHref)) {
        link.classList.add("active")
    }
}
