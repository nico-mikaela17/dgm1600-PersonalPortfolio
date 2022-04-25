import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { getLastNumber, removeChildren } from '../utils/index.js'


const allMembersOfCongress = [...senators, ...representatives] 

const main = document.querySelector('main')
const header = document.querySelector('header')

const senatorsDiv = document.querySelector('.senatorsdiv')
const repDiv = document.querySelector('.representativesdiv')
const seniorityHeader = document.querySelector('.seniority')
const loyaltyList = document.querySelector('.loyaltylist')

const republicanSenators = senators.filter(senator => senator.party === 'R')  // elegant filter!
const republicanRep = representatives.filter(representative => representative.party === 'R')  // elegant filter!
const democratSenators = senators.filter(senator => senator.party === 'D')  // elegant filter!
const democratRep = representatives.filter(representative => representative.party === 'D')  // elegant filter!



function simplifiedSenators() {
  return senators.map(senator => {
    const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      gender: senator.gender,
      party: senator.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
      seniority: +senator.seniority,
      state: senator.state,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct
    }
  })
}

function populateSenatorDiv(senatorsArray) {
    removeChildren(main)
  senatorsArray.forEach((senator) => {
    const senFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')

    //let govtrack_id = getLastNumber(senator.id)

    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorsDiv.appendChild(senFigure)
  })
}

populateSenatorDiv(senators)

function simplifiedRepresentatives() {
    return representatives.map(representative => {
      const middleName = representative.middle_name ? ` ${representative.middle_name} ` : ` `
      return {
        id: representative.id,
        name: `${representative.first_name}${middleName}${representative.last_name}`,
        gender: representative.gender,
        party: representative.party,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${representative.govtrack_id}-200px.jpeg`,
        seniority: +representative.seniority,
        state: representative.state,
        missedVotesPct: representative.missed_votes_pct,
        loyaltyPct: representative.votes_with_party_pct
      }
    })
  }


  function populateRepDiv(representativesArray) {
    removeChildren(main)
  representativesArray.forEach((representative) => {
    const repFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')

    //let govtrack_id = getLastNumber(senator.id)

    figImg.src = representative.imgURL
    figCaption.textContent = representative.name

    repFigure.appendChild(figImg)
    repFigure.appendChild(figCaption)
    repDiv.appendChild(repFigure)
  })
}
populateRepDiv(representatives)

const allSenators = document.createElement('button')
allSenators.textContent = 'All Senators'
allSenators.addEventListener('click', function () {
  populateSenatorDiv(senator)
  console.log(allSenators)
})

header.appendChild(allSenators)

const allRepresentatives = document.createElement('button')
allRepresentatives.textContent = 'All Representatives'
allRepresentatives.addEventListener('click', function () {
  populateRepDiv(representative)
  console.log(allRepresentatives)
})

header.appendChild(allRepresentatives)

const allRepublicans = document.createElement('button')
allRepublicans.textContent = 'Republicans'
allRepublicans.addEventListener('click', () => populateSenatorDiv(republicanRep + republicanSenators))

header.appendChild(allRepublicans)

const allDemocrats = document.createElement('button')
allDemocrats.textContent = 'Democrats'
allDemocrats.addEventListener('click', () => populateSenatorDiv(democratRep + democratSenators))

header.appendChild(allDemocrats)

populateSenatorDiv(simplifiedSenators())
populateRepDiv(simplifiedRepresentatives())

const mostSeniorSenator = simplifiedSenators().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)
const mostSeniorRep = simplifiedRepresentatives().reduce((acc, representative) => acc.seniority > representative.seniority ? acc : representative)

const biggestMissedVotesPct = simplifiedSenators().reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc : senator)

const biggestVactionerList = simplifiedSenators().filter(senator => senator.missedVotesPct === biggestMissedVotesPct.missedVotesPct).map(senator => senator.name).join(' and ')

seniorityHeader.textContent = `The most senior Senator is ${mostSeniorSenator.name} and most senior Representative is ${mostSeniorRep.name} and the biggest fans of vacations are ${biggestVactionerList}.`

simplifiedSenators().forEach(senator => {
  if(senator.loyaltyPct === 100) {
    let listItem = document.createElement('li')
    listItem.textContent = senator.name
    loyaltyList.appendChild(listItem)
  }
})

// TODO items to consider for your final project
// TODO: Some sort of UI for sorting by party affiliation or by party and gender with a count
// TODO: Much better styling of the grid of senators and their names.
// TODO: Maybe include more data with each congress member such as links to their Twitter or Facebook pages
// TODO: Incorporate a way to select the members of the house of representatives