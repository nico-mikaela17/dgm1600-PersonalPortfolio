const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      const data = await result.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  
  getAPIData('https://pokeapi.co/api/v2/pokemon/snorlax')