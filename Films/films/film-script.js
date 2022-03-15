import {films} from "../data/films.js"

console.log(films[0].url)

function getLastNumber(url) {
    const secondToLastLetterOfUrl = url[url.length - 2]
    return secondToLastLetterOfUrl//return the second to last number from the url property of a film object
}

console.log(getLastNumber['https://swapi.co/api/films/7/'])

let filmList = document.querySelector('#filmList')

let newImage = document.createElement('img')

newImage.src = 'https://starwars-visualguide.com/assets/img/films/6.jpg'

filmList.appendChild(newImage)
