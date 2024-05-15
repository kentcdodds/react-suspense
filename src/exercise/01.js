import * as React from 'react'
import {PokemonDataView, fetchPokemon} from '../pokemon'

function createResource(promise) {
  let status = 'pending'
  let result = promise
    .then(resolved => {
      status = 'resolved'
      result = resolved
    })
    .catch(rejected => {
      status = 'rejected'
      result = rejected
    })
  return {
    read() {
      if (status === 'pending' || status === 'rejected') throw result
      if (status === 'resolved') return result
    },
  }
}

const pokemonResource = createResource(fetchPokemon('pikachu'))
function PokemonInfo() {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <React.Suspense fallback={<div>Loading...</div>}>
          <PokemonInfo />
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
