import { removeChildren } from "../utils/index.js"

const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      return await result.json()
    } catch (error) {
      console.error(error)
    }
  }

  class Pokemon{
    constructor(name, height, weight, abilities, types, moves) {
      (this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types),
      (this.moves = moves)
    }
  }
 
  const loadedPokemon = []

 const pokeHeader = document.querySelector('header')
 const pokeNav = document.querySelector('nav')

 const loadButton = document.createElement('button')
 loadButton.textContent = 'Load Pokemon'
 pokeNav.appendChild(loadButton)
 loadButton.addEventListener('click', async () => {
  if(loadedPokemon.length === 0){
    removeChildren(pokeGrid)
  await loadPokemon(0, 50)}
})

  const pokeGrid = document.querySelector('.pokegrid')
  const newButton = document.createElement('button')
  newButton.textContent = 'New Pokemon'
  pokeNav.appendChild(newButton)
  newButton.addEventListener('click', () => {
    const pokeName = prompt('What is the name of your new Pokemon?', 'Nicole')
    const pokeHeight = prompt('How tall is it?')
    const pokeWeight = prompt("What is the Pokemon's weight?")
    const pokeAbilities = prompt("what are the Pokemon's abilities? Separate by commas,pls")
    const pokeTypes = prompt("What are your Pokemon's types? (up to 2 types separated by a space)")
    const pokeMoves = prompt('What moves does your Pokemon have? (up to 3 moves separated by a /slash/')

    const newPokemon = new Pokemon(
      pokeName, 
      pokeHeight, 
      pokeWeight, 
      makeAbilitiesArray(pokeAbilities),
      makeTypesArray(pokeTypes),
      makeMovesArray(pokeMoves),
  )
  populatePokeCard(newPokemon)
})

function makeAbilitiesArray(commaString) {
  return commaString.split(',').map((abilityName) => {
    return { ability:{name: abilityName}}
  })
}

function makeTypesArray(spaceString) {
  return spaceString.split(' ').map((typeName) => {
    return { type:{name: typeName}}
  })
}

function makeMovesArray(slashString) {
  return slashString.split('/').map((moveName) => {
    return { move:{name:moveName}}
  })
}



async function loadPokemon(offset = 0, limit = 25) {
   const data = await getAPIData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
   for (const nameAndUrl of data.results){
     const singlePokemon = await getAPIData(nameAndUrl.url)
    const simplifiedPokemon = {
      id: singlePokemon.id,
      height: singlePokemon.height,
      weight: singlePokemon.weight,
      name: singlePokemon.name,
      abilities: singlePokemon.abilities,
      types: singlePokemon. types,
      moves: singlePokemon.moves.slice(0, 3),
      hp: singlePokemon.stats[0].base_stat
    }
    loadedPokemon.push(simplifiedPokemon)
     populatePokeCard(simplifiedPokemon)
   }
}

//loop through array and populate through individual pokemon cards


function populatePokeCard(pokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'))
    //populate the front of the card
    pokeCard.appendChild(populateCardFront(pokemon))
    pokeCard.appendChild(populateCardBack(pokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    const pokeFront = document.createElement('figure')
    pokeFront.className = 'cardFace front'


    const pokeType = pokemon.types[0].type.name
    const pokeType2 = pokemon.types[1]?.type.name
    //console.log(pokeType,pokeType2)
    pokeFront.style.setProperty('background', getPokeTypeColor(pokeType))
    


    if(pokeType2) {
      pokeFront.style.setProperty('background', `linear-gradient(${getPokeTypeColor(pokeType)}, ${getPokeTypeColor(pokeType2)})`)
    }
    
    const pokeImg = document.createElement('img')
    if (pokemon.id === 9001) {
      pokeImg.src = '/images/pokeball.png'
    }    else {
      pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    }
    const pokeCaption = document.createElement('figcaption')
    pokeCaption.textContent = pokemon.name

    pokeFront.appendChild(pokeImg)
    pokeFront.appendChild(pokeCaption)
    return pokeFront
}

function populateCardBack(pokemon) {

  const pokeBack = document.createElement('div')
  pokeBack.className = 'cardFace back'

  const pokeType = pokemon.types[0].type.name
  //const pokeType2 = pokemon.types[1]?.type.name

  pokeBack.style.setProperty('background', getPokeTypeColor(pokeType))
  
  //pokeBack.style.opacity = "0.7";

  const idItem = document.createElement('h3')
  idItem.textContent = 'ID: ' + pokemon.id
  pokeBack.appendChild(idItem)

  const heightItem = document.createElement('h3')
  heightItem.textContent = 'Height: ' + pokemon.height
  pokeBack.appendChild(heightItem)

  const weightItem = document.createElement('h3')
  weightItem.textContent = 'Weight: ' + pokemon.weight
  pokeBack.appendChild(weightItem)

  const pokeHp = document.createElement('h4')
  pokeHp.textContent = 'HP: ' + pokemon.hp
  pokeBack.appendChild(pokeHp)

  const label = document.createElement('h4')
  label.textContent = ' Abilities'
  pokeBack.appendChild(label)

  const abilityList = document.createElement('ul')
  pokemon.abilities.forEach((abilityItem) => {
    const listItem = document.createElement('li')
    listItem.textContent = abilityItem.ability.name
    abilityList.appendChild(listItem)
  })
  pokeBack.appendChild(abilityList)

  const labelTypes = document.createElement('h4')
  labelTypes.textContent = 'Types'
  pokeBack.appendChild(labelTypes)

  const typesList = document.createElement('ul')
  pokemon.types.forEach((typesItem) => {
    const listItem = document.createElement('li')
    listItem.textContent = typesItem.type.name
    typesList.appendChild(listItem)
  })
  pokeBack.appendChild(typesList)

  const labelMoves = document.createElement('h4')
  labelMoves.textContent = 'Moves'
  pokeBack.appendChild(labelMoves)

  const movesList = document.createElement('ul')
  pokemon.moves.forEach((movesItem) => {
    const listItem = document.createElement('li')
    listItem.textContent = movesItem.move.name
    movesList.appendChild(listItem)
  })
  pokeBack.appendChild(movesList)



  return pokeBack
  
}

function getPokeTypeColor(pokeType) {
  // if(pokeType === 'grass') return '#00FF00'
  let color
  switch (pokeType) {
    case 'figthing':
      color = '#C03028'
      break
    case 'ghost':
      color = '#705898'
      break
    case 'dark':
      color = '#705848'
      break
    case 'steel':
      color = '#B8B8D0'
      break
    case 'fairy':
      color = '#EE99AC'
      break
    case 'dragon':
      color = '#7038F8'
      break
    case 'rock':
      color = '#B8A038'
      break
    case 'ice':
      color = '#98D8D8'
      break
    case 'grass':
      color = '#78C850'
      break
    case 'fire':
      color = '#F08030'
      break
    case 'water':
      color = '#6890F0'
      break
    case 'bug':
      color = '#A8B820'
      break
    case 'normal':
      color = '#A8A878'
      break
    case 'flying':
      color = '#A890F0'
      break
    case 'poison':
      color = '#A040A0'
      break
    case 'electric':
      color = '#F8D030'
      break
    case 'psychic':
      color = '#F85888'
      break
    case 'ground':
      color = '#E0C068'
      break
    default:
      color = '#888888'
  }
  return color
}

function filterPokemonByType(type) {
  return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type)
}


const typeSelector = document.querySelector('#type-select')
typeSelector.addEventListener('change', (event) => {
  const usersTypeChoice = event.target.value.toLowerCase()
 if(event.target.value === 'Show all'){
  removeChildren(pokeGrid)
  loadedPokemon.forEach((singlePokemon) => {
    populatePokeCard(singlePokemon)})
   } else{
  const pokemonByType = filterPokemonByType(usersTypeChoice)
  removeChildren(pokeGrid)
  pokemonByType.forEach((eachSinglePokemon) => populatePokeCard(eachSinglePokemon))
  calculateHP()
}
})

function calculateHP() {
  const mostHP = loadedPokemon().reduce((acc, pokemon) => acc.hp > pokemon.hp ? acc: pokemon, {})

  const messageArea = document.querySelector('.messageArea')
    messageArea.textContent = `The Pokemon with the most HP is ${mostHP.name} at ${mostHP.hp}`

}


