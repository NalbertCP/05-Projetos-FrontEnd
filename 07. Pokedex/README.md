<h1><img width="80px" height="80px" src="https://i.imgur.com/xCuEJI7.png"> Pokedex</h1>
<div class="badges">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
</div>
<br>

<h2>📋 Descrição</h2>
<p>
  Projeto criado com objetivo de consumir uma API pública de pokemons e exibi-los em cards de uma só vez em uma pagina web.
  <br>
  <b>O Design do projeto foi inspirado em uma página de pokedex ja existente, para mais informações segue abaixo o link do projeto original.</b>
</p>
<p>
    Observação: como este projeto consome dados através da API fetch( ), recomendo que o projeto seja executado em um servidor, a exemplo do plugin LiveServer do VsCode, caso contrário não será possível consumir os dados durante a aplicação.
</p>

```md
[Original Pokedex project wich inspired me] https://ifpb.github.io/challenges/web/front-end/js/pokedex/
```

<h3>Funcionalides</h3>
<p> - Visualização de todos os pokemos em cards em uma única página;
  <br> - Filtragem dos pokemons por nome e tipo (tipo terrestre, aquático ou aéreo por exemplo);
  <br> - Ordenação dos pokemons de A à Z, Z à A, ordem crescente e ordem decrescente de Id;
  <br> - Exibição de mais informações de cada pokemon ao clicar em seu respectivo card.
</p>

<img width="800px" src="https://user-images.githubusercontent.com/105606295/192077415-407f9c89-ba61-40f2-b117-1ca207a651d6.png">

<h3>Consumindo API</h3>
<p> A API pública utilizada para consumir os dados utilizados no projeto segue no link abaixo.</p>

```md
[PokeAPI ] https://pokeapi.co/
```

<p>Como a API original fornece milhares de dados de mais de 1100 Pokemons, precisei criar um algorítimo que me gerasse um arquivo JSON contendo apenas as informações nescessárias para o projeto, e principalmente, com um número bem menor de pokemons para nao sobrecarregar a página.</p>

<h2> 🎮 Criando Base de Dados Personalizada</h2>
<p>Siga o passo a passo abaixo caso queira criar uma base dados com uma quantidade de pokemons diferente da utilizada pelo projeto.</p>

```md
1º Clone este repositório, e com terminal aberto navegue até o diretório deste projeto.
2º Baixe as dependências deste projeto com npm install.
3º Inicie o projeto com (npm start nº de pokemons) ou (node script.js nº de pokemons).
```

<img width="500px" src="https://user-images.githubusercontent.com/105606295/192077554-6c733252-55f3-45d8-9180-4eb83be6b6c9.png">
<p><b>Após seguir o passo a passo acima, uma nova base de dados será criada e substituirá a base de dados atual do projeto.</b></p>

<h2> 💻 Stacks utilizadas</h2>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>NodeJS</li>
</ul>

<h2> 💵 Licença</h2>
<p><b>O uso de todos os arquivos deste projeto é limitado apenas a fins de estudos.<b></p>
