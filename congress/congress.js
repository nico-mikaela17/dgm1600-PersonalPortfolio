import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'


const allMembersOfCongress = [...senators, ...representatives] 

//REL
const navBar = document.querySelector('.navBar')
const congressDiv = document.querySelector('.congress')
const seniorityHeader = document.querySelector('.seniority')
const loyaltyList = document.querySelector('.loyaltylist')

//MAP function - filter
function simplifiedMembers(people){
  return people.map((member) => {
    const middleName = member.middle_name ? ` ${member.middle_name} ` : ` `
    return {
      id: member.id,
      name: `${member.first_name}${middleName}${member.last_name}`,
      gender: member.gender,
      party: member.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-200px.jpeg`,
      seniority: +member.seniority,
      state: member.state,
      missedVotesPct: member.missed_votes_pct,
      loyaltyPct: member.votes_with_party_pct
    }
  })
}

//template
/*function simplifiedSenators() {
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
}*/

function populateCongressDiv(congressMembers) {
    removeChildren(congressDiv)
    congressMembers.forEach((member) => {
    const memberFig = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')

    figImg.src = member.imgURL
    figCaption.textContent = member.name

    memberFig.appendChild(figImg)
    memberFig.appendChild(figCaption)
    congressDiv.appendChild(memberFig)

    if (member.party === 'R'){
      figCaption.style.setProperty('background-color', '#b60e0e')
     }
     if (member.party === 'R'){
       memberFig.style.setProperty('background-color', '#b60e0e')
      }
 
     if (member.party === 'D'){
       figCaption.style.setProperty('background-color', '#02478E')
     }
 
     if (member.party === 'D'){
       memberFig.style.setProperty('background-color', '#02478E')
     }
  })
}

populateCongressDiv(simplifiedMembers(allMembersOfCongress))

//FILTERS
const allSenators = simplifiedMembers(senators)
const allRepresentatives = simplifiedMembers(representatives)
const republicanMembers = allMembersOfCongress.filter(republican => republican.party === 'R')  // elegant filter!
const democratMembers = allMembersOfCongress.filter(democrat => democrat.party === 'D')  // elegant filter!


//BUTTONS
const allSenatorMembers = document.createElement('button')
allSenatorMembers.textContent = 'All Senators'
allSenatorMembers.addEventListener('click', function () {
  populateCongressDiv(allSenators)
})
navBar.appendChild(allSenatorMembers)

const allRepresentativeMembers = document.createElement('button')
allRepresentativeMembers.textContent = 'All Representatives'
allRepresentativeMembers.addEventListener('click', function () {
  populateCongressDiv(allRepresentatives)
})
navBar.appendChild(allRepresentativeMembers)

const allRepublicans = document.createElement('button')
allRepublicans.textContent = 'Republicans'
allRepublicans.addEventListener('click', () => populateCongressDiv(simplifiedMembers(republicanMembers)))

navBar.appendChild(allRepublicans)

const allDemocrats = document.createElement('button')
allDemocrats.textContent = 'Democrats'
allDemocrats.addEventListener('click', () => populateCongressDiv(simplifiedMembers(democratMembers)))

navBar.appendChild(allDemocrats)

populateCongressDiv(simplifiedMembers())

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