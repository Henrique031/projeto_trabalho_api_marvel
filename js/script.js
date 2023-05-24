const conteudo = document.getElementById('conteudo')
const input = document.getElementById('search_bar')
const btn_submit = document.getElementById('btn_submit')
const form = document.querySelector('form')
const closeModalButton = document.getElementById('close-modal')
const modal = document.getElementById('modal')
const fade = document.getElementById('fade')
const nomeModal = document.getElementById('nome-heroi-modal')
const descModal = document.getElementById('desc-heroi-modal')



let dataCards = []
// let objResultFind = {}
let nomeInput = ''


const ts = '1684159434'
const apiKey = '8331805745ad4af83cb8cd13f1b25bde'
const hash = '2be70ded843772f83c1267a51522e544'


const getCards = () => {

    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=100`
    // console.log(url)

    fetch(url)
        .then((response) => response.json())
        .then((dados) => setDadosCards(dados))

}

getCards()

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
// console.log(cards)
}

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

    // console.log(nome)
    // console.log(desc === '')
}

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


function clearCards() {

    while (conteudo.firstChild) {
      conteudo.removeChild(conteudo.firstChild);
    }
}

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



const toggleModal = () => {

    
    
    modal.classList.toggle('hide')
    fade.classList.toggle('hide')
}


input.addEventListener('keyup', (dados) => {
    
    nomeInput = input.value.toLowerCase().trim()

    if(nomeInput == '') {
        getCards()
    } else {
        searchCard(nomeInput)
    }


})

form.addEventListener('submit', function(event) {
    event.preventDefault();
});


[conteudo ,closeModalButton, fade].forEach((el) => {
    el.addEventListener('click', () => toggleModal())
})

