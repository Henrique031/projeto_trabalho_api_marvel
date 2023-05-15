let conteudo = document.getElementById('conteudo')


const getCards = () => {

    const ts = '1684159434'
    const apiKey = '8331805745ad4af83cb8cd13f1b25bde'
    const hash = '2be70ded843772f83c1267a51522e544'
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`

    fetch(url)
        .then((response) => response.json())
        .then((dados) => createCards(dados))

}

const createCards = (dados) => {
    
    dados.data.results.forEach(cards => {

        let imagem = cards.thumbnail.path + '.' + cards.thumbnail.extension
        let nome = cards.name
        let desc = cards.description

        let nomeNode = document.createTextNode(nome)
        let descNode = document.createTextNode(desc)


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

        const descHeroi = document.createElement('p')
        descHeroi.setAttribute('class', 'desc_heroi')
        
        divCard.appendChild(nomeH2)
        divCard.appendChild(descHeroi)
        
        nomeH2.appendChild(nomeNode)
        descHeroi.appendChild(descNode)

    });

}

getCards()










