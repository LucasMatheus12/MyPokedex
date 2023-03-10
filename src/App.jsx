import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    loadPokemonList();
  }, [offset])

  const loadPokemonList = () => {
    setLoading(true);
    axios.get(`${apiUrl}?limit=10&offset=${offset}`)
      .then(response => {
        setPokemonList(prevState => [...prevState, ...response.data.results]);
        setLoading(false)
      })

      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const loadPokemon = (url) => {
    axios.get(url)
      .then(response => {
        setSelectedPokemon(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <button onClick={() => loadPokemon(pokemon.url)}>{pokemon.name}</button>
          </li>
        ))}
      </ul>

      <div>
        <button disabled={offset === 0} onClick={() => setOffset(offset - 10)}>Anterior</button>
        <button disabled={loading} onClick={() => setOffset(offset + 10)}>Próximo</button>
      </div>

      {loading && <p> Carregando...</p>}
      {!loading && (
        <div>
          {selectedPokemon ? (
            <div>
              <p>Nome: {selectedPokemon.name}</p>
              <p>Tipos: {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
              <p>Peso: {selectedPokemon.weight} kg</p>
              <p>Altura: {selectedPokemon.height} m</p>
              <img src= {selectedPokemon.sprites.front_default}/>
            </div>
          ) : (
            <p>Selecione um Pokémon para visualizar as informações</p>
          )}

        </div>
      )}

    </div>
  );
}

export default App;
