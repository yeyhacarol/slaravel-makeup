'use strict'
/* função que armazena todos os produtos relativos a marca */
const searchByBrand = async (brand) => {
    const url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

/* função que armazena todos os produtos */
const allFromMakeup = async () => {
    const url = 'http://makeup-api.herokuapp.com/api/v1/products.json'
    const response = await fetch(url)
    const data = await response.json()

    return data
}

/* função para guardar a url de todos os produtos, levando em consideração que alguns produtos podem possuir mais de uma url */
const getByProductType = async (urls) => {
    let makeUp = []

    for (const url of urls) {
        const response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${url}`)
        const data = await response.json()

        makeUp = makeUp.concat(data)
    }

    return makeUp
}

//função que cria todos os cards 
const creatingCard = (product) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML =
        `<div class="img">
            <img src="${product.image_link}" alt="">
        </div>
        <div class="description">
            <span>${product.brand}</span>
            <span title="${product.name}">${product.name}</span>
            <span>$ ${product.price}</span>
        </div>`

    return card
}

//função que carrega todos os itens relativos a marca 
const loadindCardByBrand = async () => {
    const brand = document.getElementById('brand').value
    const container = document.getElementById('products-content')

    const cards = await searchByBrand(brand)
    const tagCards = cards.map(creatingCard)

    container.replaceChildren(...tagCards)
}

/* função para carregar os produtos levando em consideração o tipo e o endpoint de cada tipo de produto */
const loadCard = async (productType, urlType) => {
    const brand = document.getElementById(productType)
    const container = document.getElementById('products-content')

    const cards = await getByProductType(urlType)
    const tagCards = cards.map(creatingCard)

    container.replaceChildren(...tagCards)

    console.log(productType)
}

/* função que armazena todos os itens, para posteriormente serem filtrados por marca para podermos inseri-las no datalist */
const loadingBrand = async () => {
    const list = document.getElementById('brand-list')
    const products = await allFromMakeup()

    const brands = [...new Set(products.map(item => item.brand))]
    let lista = ''
    brands.forEach(brand => {
        lista +=
            `<option>
            ${brand}
        </option>`
    })

    list.innerHTML = lista
}

/* resgatando os links, adicionando um evento de click e chamando uma função que carrega os cards, passando coomo parâmetro o tipo de produto e o final da url que é correspondente ao produto */
document.getElementById('pele').addEventListener('click', function () {
    loadCard('pele', ['foundation'])
})
document.getElementById('labios').addEventListener('click', function () {
    loadCard('labios', ['lipstick'])
})
document.getElementById('olhos').addEventListener('click', function () {
    loadCard('olhos', ['eyeliner', 'eyeshadow', 'mascara'])
})
document.getElementById('sobrancelha').addEventListener('click', function () {
    loadCard('sobrancelha', ['eyebrown'])
})
document.getElementById('unhas').addEventListener('click', function () {
    loadCard('unhas', ['nail_polish'])
})

document.getElementById('search').addEventListener('click', loadindCardByBrand)
loadingBrand()