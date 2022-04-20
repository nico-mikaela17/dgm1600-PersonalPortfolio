const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      return await result.json()
    } catch (error) {
      console.error(error)
    }
  }

  class Pokemon{
    constructor(name, height, weight, abilities, types) {
      this.id = 9001,
      this.name = name,
      this.height = height,
      this.weight = weight,
      this.abilities = abilities,
      this.types = types
    }
  }
  
  const pokeHeader = document.querySelector('header')
  const pokeGrid = document.querySelector('.pokegrid')
  const newButton = document.querySelector('button')
    newButton.textContent = 'New Pokemon'
  pokeHeader.appendChild(newButton)
  newButton.addEventListener('click', () => {
    const pokeName = prompt('What is the name of your new Pokemon?', 'Nicole')
    const pokeHeight = prompt('How tall is it?')
    const pokeWeight = prompt("What is the Pokemon's weight?")
    const pokeAbilities = prompt("what are the Pokemon's abilities? Separate by commas,pls")
    const pokeTypes = prompt("What are your Pokemon's types? (up to 2 types separated by a space)")

    const newPokemon = new Pokemon(
      pokeName, 
      pokeHeight, 
      pokeWeight, 
      makeAbilitiesArray(pokeAbilities),
      makeTypesArray(pokeTypes),
      populatePokeCard(newPokemon)
  )})

function makeAbilitiesArray(commaString) {
  return commaString.split(',').map((abilityName) => {
    return {ability:{name: abilityName}}
  })
}

function makeTypesArray(spaceString) {
  return spaceString.split(' ').map((typeName) => {
    return {type:{name: typeName}}
  })
}

const loadedPokemon = []


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
      moves: singlePokemon.moves.slice(0, 3)
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


    const pokeType = pokemon.type[0].type.name
    const pokeType2 = pokemon.type[1]?.type.name
    console.log(pokeType,pokeType2)
    pokeFront.style.setProperty('background', getPokeTypeColor(pokeType))

    if(pokeType2) {
      pokeFront.style.setProperty('background', `linear-gradient(${getPokeTypeColor(pokeType)}, ${getPokeTypeColor(pokeType2)})`)
    }
    
    const pokeImg = document.createElement('img')
    if (Pokemon.id === 9001) {
      pokeImg.src = '../images/pokeball.png'
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
  const label = document.createElement('h4')
  label.textContent = pokemon.name + ' Abilities'
  pokeBack.appendChild(label)

  const idMain = document.createElement('ul')
  pokemon.id.forEach((idOne) => {
    const idName = document.createElement('h2')
    idName.textContent = idOne.id.name
    idMain.appendChild(idName)
  })
  pokeBack.appendChild(idMain)

  const heightMain = document.createElement('ul')
  pokemon.height.forEach((heightOne) => {
    const heightNumber = document.createElement('h3')
    heightNumber.textContent = heightOne.height.name
    heightMain.appendChild(heightNumber)
  })
  pokeBack.appendChild(heightMain)

  const weightMain = document.createElement('ul')
  pokemon.weight.forEach((weightOne) => {
    const weightNumber = document.createElement('h3')
    weightNumber.textContent = weightOne.weight.name
    weightMain.appendChild(weightNumber)
  })
  pokeBack.appendChild(weightMain)

  const abilityList = document.createElement('ul')
  pokemon.abilities.forEach((abilityItem) => {
    const listItem = document.createElement('li')
    listItem.textContent = abilityItem.ability.name
    abilityList.appendChild(listItem)
  })
  pokeBack.appendChild(abilityList)

  const typesList = document.createElement('ul')
  pokemon.types.forEach((typesItem) => {
    const listItem = document.createElement('li')
    typesItem.textContent = typesItem.types.name
    typesList.appendChild(typesItem)
  })
  pokeBack.appendChild(typesList)

  const movesList = document.createElement('ul')
  pokemon.moves.forEach((movesItem) => {
    const listItem = document.createElement('li')
    movesItem.textContent = movesItem.moves.name
    movesList.appendChild(movesItem)
  })
  pokeBack.appendChild(movesList)

  return pokeBack
}

function getPokeTypeColor(pokeType) {
  // if(pokeType === 'grass') return '#00FF00'
  let color 
  switch (pokeType) {
    case 'grass': color = '#0F0'
      
      break;
  
    default:
      break;
  }
  return color
}

function filterPokemonByType(type) {
  return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type)
}


await loadPokemon(0, 25)

console.log(filterPokemonByType('grass'))