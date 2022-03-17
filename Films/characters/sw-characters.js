import { people } from '../data/people.js'

const header = document.querySelector('header')
const main = document.querySelector('main')

const allCharsButton = document.createElement('button')
allCharsButton.textContent = 'All Characters'
allCharsButton.addEventListener('click', function () {
  console.log('Thanks for clicking')
  populateDOM(people)
})
header.appendChild(allCharsButton)

const maleCharacters = people.filter(person => person.gender === 'male')

const maleCharsButton = document.createElement('button')
maleCharsButton.textContent = 'Male Characters'
maleCharsButton.addEventListener('click', () => console.log("Thanks for clicking on Male Character button"))

function populateDOM(characters) {
  people.forEach((person) => {
    const personFig = document.createElement('figure')
    const personImg = document.createElement('img')
    let charNum = getLastNumber(person.url)
    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    const personCap = document.createElement('figcaption')
    personCap.textContent = person.name

    personFig.appendChild(personImg)
    personFig.appendChild(personCap)
    main.appendChild(personFig)
  })
}

function getLastNumber(url) {
  let end = url.lastIndexOf('/')
  let start = end -2
  if (url.charAt(start) === '/') {
    start++
  }
  return url.slice(start,end)
}
  