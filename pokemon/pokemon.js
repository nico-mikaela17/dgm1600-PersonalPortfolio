const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      return await result.json()
    } catch (error) {
      console.error(error)
    }
  }
  

  const pokeGrid = document.querySelector('.pokegrid')

async function loadPokemon(offset, limit) {
   const data = await getAPIData('https://pokeapi.co/api/v2/pokemon/')
    populatePokeGrid(data)
}

function populatePokeGrid(pokemonArray) {
    console.log(pokemonArray)
    for (const singlePokemon of pokemonArray.results)(
        populatePokeCard(singlePokemon)
        )
}
//loop through array and populate through individual pokemon cards


function populatePokeCard(pokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'))
    //populate the front of the card
    pokeCard.appenChild(populateCardFront(pokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    const pokeFront = document.createElement('figure')
    pokeFront.className = 'cardFace'
    const pokeImg = document.createElement('img')
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    const pokeCaption = document.createElement('figcaption')
    pokeCaption.textContent = pokemon.name

    pokeFront.appendChild(pokeImg)
    pokeFront.appendChild(pokeCaption)
    return pokeFront
}

function populateCardBack(pokemon) {
}

loadPokemon(0, 0)