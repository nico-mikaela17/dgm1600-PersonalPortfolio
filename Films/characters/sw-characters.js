import {people} from '../data/people.js'

const header = document.querySelector('header')
const main = document.querySelector('main')

const allCharactersButton = document.createElement('button')
allCharactersButton.textContent = 'All Characters'
allCharactersButton.addEventListener('click',function (event) {
    console.log ('Thanks for clicking!')
})

header.appendChild(allCharactersButton)

people.forEach((person) => { 
const personFig = document.createElement('figure')
const personTag = document.createElement('img')
personImg.src = 'https://starwars-visualguide.com/assets/img/characters/1.jpg'
const personCap = document.createElement('figcaption')


personFig.appendChild(personTag)
personFig.appendChild(personCap)
main.appendChild(personFig)
)}