import {starships} from "../data/starships.js"
import {getLastNumber, removeChildren} from "../utils/index.js"

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipViwer = document.querySelector('.shipViewer')

const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.modal-close')
const shipMessage = document.querySelector('box')

closeModal.addEventListener('click', () => modal.classList.toggle('is-active'))


function populateNav() {
    starships.forEach((starship) => {
        const listItem = document.createElement('li')

        const anchor = document.createElement('a')
        anchor.href = '#'
        anchor.textContent = starship.name
        anchor.addEventListener('click', () => populateShipView(starship))


        listItem.textContent = starship.name
        navList.appendChild(listItem)
    })
}

populateNav()
function populateShipView(){
    removeChildren(shipViwer)
console.log('Thanks for clicking on..', starships.name)

const shipImage = document.createElement('img')
let shipNum = getLastNumber(shipData.url)
shipImage.src =   figImage.src = `https://starwars-visualguide.com/assets/img/films/${starships}.jpg`
$(starship)
shipImage.addEventListener('error', () =>{
    console.log('Image Error!!')
    shipImage.hidden = true
    shipMessage.textContent = `The ship know as' $(starships.name), 'is in the shop for repairs`
    modal.classList.toggle('is-active')
})
shipViwer.appendChild(shipImage)
}