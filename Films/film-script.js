import { films } from '../data/films.js'
import { getLastNumber } from '../utils/index.js'

console.log(films[0].url)

// First, get a reference to the main elememt with the id 'filmList' and store it in a variable
let filmList = document.querySelector('#filmList')

// for (initialize variable; condition check; increment variable)
for (let i = 0; i < films.length; i++) {
  // Second, use the document.createElement function/method to create a new img element

  let figure = document.createElement('figure')
  let figImage = document.createElement('img')
  let figCaption = document.createElement('figcaption')

  // Third, set the source property of the new image to a valid URL or path

  let filmNum = getLastNumber(films[i].url)
  figImage.src = `https://starwars-visualguide.com/assets/img/films/${filmNum}.jpg`
  figCaption.textContent = films[i].title

  // Fourth, add the newly created image as a child of the main element
  figure.appendChild(figImage)
  figure.appendChild(figCaption)

  filmList.appendChild(figure)
}