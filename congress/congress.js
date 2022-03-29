import { senators } from "../data/senators.js"

function simplifiedSenators() {
    return senators.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return{
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            gender: senator.gender,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            sate: senator.state,
            seniority: senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,

        }
    })
}

function populateSenatorDiv(simplifiedSenators) {
    //TODO: create a fig element with image and figcaption
    //set img src imgURL
    //appendChildren to the DOM
}