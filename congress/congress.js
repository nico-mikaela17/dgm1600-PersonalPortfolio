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
function simplifiedMembers(members){
  return members.map(member => {
    const middleName = member.middle_name ? ` ${member.middle_name} ` : ` `
    return {
      id: member.id,
      name: `${member.first_name}${middleName}${member.last_name}`,
      gender: member.gender,
      twitter_account: member.twitter_account,
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
    figCaption.textContent = member.name + ' @' + member.twitter_account

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

     if (member.party === 'ID'){
      figCaption.style.setProperty('background-color', '#228B22')
     }
     if (member.party === 'ID'){
       memberFig.style.setProperty('background-color', '#228B22')
      }
  })
}

populateCongressDiv(simplifiedMembers(allMembersOfCongress))

//FILTERS
const allSenators = simplifiedMembers(senators)
const allRepresentatives = simplifiedMembers(representatives)
const republicanMembers = allMembersOfCongress.filter(republican => republican.party === 'R')  // elegant filter!
const democratMembers = allMembersOfCongress.filter(democrat => democrat.party === 'D')  // elegant filter!
const independentMembers = allMembersOfCongress.filter(independent => independent.party === 'ID')


//BUTTONS
const allSenatorMembers = document.createElement('button')
allSenatorMembers.textContent = 'Senators'
allSenatorMembers.addEventListener('click', function () {
  populateCongressDiv(allSenators)
})
navBar.appendChild(allSenatorMembers)

const allRepresentativeMembers = document.createElement('button')
allRepresentativeMembers.textContent = 'Representatives'
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

const allIndependent = document.createElement('button')
allIndependent.textContent = 'Independents'
allIndependent.addEventListener('click', () => populateCongressDiv(simplifiedMembers(independentMembers)))

navBar.appendChild(allIndependent)


//Seniority and Loyalty
  
const mostSeniorMember = simplifiedMembers().reduce((acc, member) => acc.seniority > member.seniority ? acc : member)

const biggestMissedVotesPct = simplifiedMembers().reduce((acc, member) => acc.missedVotesPct > member.missedVotesPct ? acc : member)

const biggestVactionerList = simplifiedMembers().filter(member => member.missedVotesPct === biggestMissedVotesPct.missedVotesPct).map(member => member.name).join(' and ')

seniorityHeader.textContent = `The most senior Senator is ${mostSeniorMember.name} and the biggest fans of vacations are ${biggestVactionerList}.`

simplifiedMembers().forEach(member => {
  if(member.loyaltyPct === 100) {
    let listItem = document.createElement('li')
    listItem.textContent = member.name
    loyaltyList.appendChild(listItem)
  }
})