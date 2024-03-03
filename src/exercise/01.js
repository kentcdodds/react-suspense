// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon} from '../pokemon'

let pokemon = {
  data: null,
  error: null,
}

const pokemonPromise = fetchPokemon('pikachu').then(
  data => {
    pokemon.data = data
  },
  error => {
    pokemon.error = error
    console.error(error)
  },
)

function PokemonInfo() {
  if (!pokemon.data) {
    throw pokemonPromise
  }

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.data.image} alt={pokemon.data.name} />
      </div>
      <PokemonDataView pokemon={pokemon.data} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <React.Suspense fallback={<>loading...</>}>
          <PokemonInfo />
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
