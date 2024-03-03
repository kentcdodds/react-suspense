// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'

function createResource(asyncCallback) {
  let data = null
  let error = null

  const handleSuccess = d => (data = d)
  const handleError = e => (error = e)

  const promise = asyncCallback.then(handleSuccess, handleError)

  return {
    promise: () => promise,
    read: () => data,
    error: () => error,
  }
}

const resource = createResource(fetchPokemon('pikachu'))

function PokemonInfo() {
  const promise = resource.promise()
  const error = resource.error()
  const pokemon = resource.read()

  if (error) {
    throw error
  }

  if (!pokemon) {
    throw promise
  }

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
        <React.Suspense fallback={<>loading...</>}>
          <PokemonErrorBoundary>
            <PokemonInfo />
          </PokemonErrorBoundary>
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
