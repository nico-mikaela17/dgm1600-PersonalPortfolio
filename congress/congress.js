import { senators } from "../data/senators.js"

const senatorsDiv = document.querySelector('.senatorsdiv')

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
            seniority: senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,

        }
    })
}

function populateSenatorDiv(senatorsArray) {
    simplifiedSenators.forEach(senator => {
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