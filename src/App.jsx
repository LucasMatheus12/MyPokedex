import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
          .then(response => {
            console.log(response);
            setPokemonList(response.data.results);
          })

          .catch(error => {
            console.log(error)
          })

  }, ['https://pokeapi.co/api/v2/pokemon']); 
  return (
    <>
    <ul>
      {pokemonList.map(pokemon => (
        <li key={pokemon.name}> {pokemon.name}</li>
      ))}
    </ul>
    </>
  )
}

export default App
