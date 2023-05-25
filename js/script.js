//Trazendo os elementos html para o js
const conteudo = document.getElementById('conteudo')
const input = document.getElementById('search_bar')
const btn_submit = document.getElementById('btn_submit')
const form = document.querySelector('form')
const closeModalButton = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const fade = document.getElementById('fade')
const nomeModal = document.getElementById('nome-heroi-modal')
const descModal = document.getElementById('desc-heroi-modal')

//Array usada para guardar informações da requisição
let dataCards = []

//Deixar o input vazio
let nomeInput = ''

//Parte de segurança da api
const ts = '1684159434'
const apiKey = '8331805745ad4af83cb8cd13f1b25bde'
const hash = '2be70ded843772f83c1267a51522e544'

//Função que faz a requisição para api
const getCards = () => {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=50`
    // console.log(url)

    fetch(url)
        .then((response) => response.json())
        .then((dados) => setDadosCards(dados))

}

//Chamando a função, que inicializara tudo
getCards()

//Função que guarda as informações da api, em um array
const setDadosCards = (dados) => {
    dataCards = []
    dados.data.results.forEach((dados, i) => {
        dataCards[i] = {
            id: ++i,
            nome: dados.name.replace(/[-()]/g, ""),
            foto: dados.thumbnail.path + '.' + dados.thumbnail.extension,
            desc: dados.description
    }
})
    createAllCards()
}

//Função que passa o nome e a descrição para o modal, antes de abri-lo.
function modalHeroi(nome, desc){
    let notFound = 'Esse personagem, não possui descrição :('

    nomeModal.innerText = ''
    descModal.innerText = ''

    if (desc !== '') {
        let nomeHeroi = document.createTextNode(nome)
        let descHeroi = document.createTextNode(desc)
        
        nomeModal.appendChild(nomeHeroi)
        descModal.appendChild(descHeroi)
    } else {
        let nomeHeroi = document.createTextNode(nome)
        let descHeroi = document.createTextNode(notFound)
        
        nomeModal.appendChild(nomeHeroi)
        descModal.appendChild(descHeroi)
    }
}

//Função que cria todos os cards
const createAllCards = () => {
    clearCards()
    dataCards.forEach((e, i) => {

        let imagem = e.foto
        let nome = e.nome
        let desc = e.desc

        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        divCard.onclick = () => {
            modalHeroi(nome, desc)
        }
        const divFotoHeroi = document.createElement('div')
        divFotoHeroi.setAttribute('class', 'div_foto_heroi')

        const figure = document.createElement('figure')
    
        const img = document.createElement('img')
        img.setAttribute('src', imagem)
        img.setAttribute('alt', `Herói: ${nome}`)

        conteudo.appendChild(divCard)
        divCard.appendChild(divFotoHeroi)
        divFotoHeroi.appendChild(figure)
        figure.appendChild(img)

        
        const nomeH2 = document.createElement('h2')
        nomeH2.setAttribute('class', 'nome_heroi')

        
        divCard.appendChild(nomeH2)

        let nomeNode = document.createTextNode(nome)
        nomeH2.appendChild(nomeNode)

    });

    

}

//Função que limpa os cards
function clearCards() {

    while (conteudo.firstChild) {
      conteudo.removeChild(conteudo.firstChild);
    }
}

//Função de pesquisa
const searchCard = (nomeHeroi) => {
    clearCards()    

    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${nomeHeroi}&ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=100`
    // console.log(url)

    fetch(url)
        .then((response) => response.json())
        .then((dados) => setDadosCards(dados))

        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        const divFotoHeroi = document.createElement('div')
        divFotoHeroi.setAttribute('class', 'div_foto_heroi')

        const figure = document.createElement('figure')
    
        const img = document.createElement('img')
        img.setAttribute('src', imagem)
        img.setAttribute('alt', `Herói: ${nome}`)

        conteudo.appendChild(divCard)
        divCard.appendChild(divFotoHeroi)
        divFotoHeroi.appendChild(figure)
        figure.appendChild(img)

        const nomeH2 = document.createElement('h2')
        nomeH2.setAttribute('class', 'nome_heroi')
        nomeH2.setAttribute('id', 'nome_heroi')

        divCard.appendChild(nomeH2)

        let nomeNode = document.createTextNode(nome)
        
        nomeH2.appendChild(nomeNode)        
}

//Função que alterna o modal
const toggleModal = () => {
    modal.classList.toggle('hide')
    fade.classList.toggle('hide')
}

// 
input.addEventListener('keyup', (dados) => {  
    nomeInput = input.value.toLowerCase().trim()

    if(nomeInput == '') {
        getCards()
    } else {
        searchCard(nomeInput)
    }
})

//Desabilita o enter do input, impede de atualizar após o enter
form.addEventListener('submit', function(event) {
    event.preventDefault();
});

//Abre a o modal
[conteudo ,closeModalButton, fade].forEach((el) => {
    el.addEventListener('click', () => toggleModal())
})

