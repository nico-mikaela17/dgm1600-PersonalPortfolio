import { senators } from "../data/senators.js"
import {representatives} from "../data/representatives.js"
import { getLastNumber, removeChildren } from '../utils/index.js'


const allMembersOfCongress = [...senators, ...representatives]
const header = document.querySelector('header')
const main = document.querySelector('main')
const buttons = document.querySelector('.buttons')

const allCharsButton = document.createElement('button')
allCharsButton.textContent = 'All People'
buttons.appendChild(allCharsButton)
allCharsButton.addEventListener('click', function () {
  populateDOM(senators)
})

const senatorsDiv = document.querySelector('.senatorsdiv')
const representativesDiv = document.querySelector('.representativesdiv')
const seniorityHeader = document.querySelector('.seniority')
const loyaltyList = document.querySelector('.loyaltylist')



const femaleRep = document.createElement('button')
//femaleRep = senators.filter(senator => senator.gender === "F")
femaleRep.textContent = 'Female Members'
femaleRep.addEventListener('click', () => populateDOM(femaleRep))
buttons.appendChild(femaleRep)

const maleRep = document.createElement('button')
//const maleRep = senators.filter(senator => senator.gender === 'M')  // elegant filter!
maleRep.textContent = 'Male Members'
maleRep.addEventListener('click', () => populateDOM(maleRep))
buttons.appendChild(maleRep)


//const republicans = senators.filter(senator => senator.party === 'Republicans')  // elegant filter!
//const democrats = senators.filter(senator => senator.party === 'Democrats')  // elegant filter!








function simplifiedSenators() {
    return senators.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return{
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            gender: senator.gender,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
            sate: senator.state,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,

        }
    })
}

function populateSenatorDiv(senatorsArray) {
    removeChildren(main)
    simplifiedSenators().forEach (senator => {
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorsDiv.appendChild(senFigure)

    })
}

populateSenatorDiv(simplifiedSenators())

const mostSeniorMember = simplifiedSenators().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)
const moreMissedVotes = simplifiedSenators().reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc : senator)
const moreMissedVotesList = simplifiedSenators().filter(senator => senator.missedVotesPct === moreMissedVotes).map(senator => senator.name).join(' and ')

seniorityHeader.textContent = `The most senior Senator is ${mostSeniorMember.name} and the person that missed more votes is ${moreMissedVotes.name} and the people that missed more votes are ${moreMissedVotesList}`

simplifiedSenators().forEach(senator => {
    if(senator.loyaltyPct === 100) {
        let listItem = document.createElement('li')
        listItem.textContent = senator.name
        loyaltyList.appendChild(listItem)
    }
})