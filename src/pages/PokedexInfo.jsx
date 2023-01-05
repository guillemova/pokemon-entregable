import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../components.jsx/pokedex/styles/pokedexInfo.css"


const PokedexInfo = () => {

  const { id } = useParams()

  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(URL)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [id])

  console.log(pokemon)

  return (
    <div>
      <header className={`poke__header bg-${pokemon?.types[0].type.name}`}>
        <img className='pokedex__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </header>
      <article className='name__container'>
        <h3 className={`poke-card__name name-${pokemon?.types[0].type.name} `} >{pokemon?.name}</h3>
        <ul className='pokedex__wh'>
          <li><span>Height</span> {pokemon?.height}</li>
          <li><span>Weight</span> {pokemon?.weight}</li>
        </ul>
      </article>
      <div className='pokedex__ability-container'>
        <article>
          <h2>Type</h2>
          <ul className='pokedex__type'>
            {pokemon?.types.map(type => (
              <li className={`pokedex__li  bg-${pokemon.types[0].type.name}`} key={type.type.name}> {pokemon.types[0].type.name}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>Skills</h2>
          <ul className='pokedex__skills'>
            <li>{pokemon?.abilities[0].ability.name}</li>
            <li>{pokemon?.abilities[1].ability.name}</li>
          </ul>
        </article>
      </div>
      <article className='movements__container' >
        <h2 className='movements__title'>Movements</h2>
        <ul className='pokedex__ul'>
          {pokemon?.moves.map(move => <li className="movements" key={move.move.url}> {move.move.name} </li>)}
        </ul>
      </article>

    </div>


  )
}

export default PokedexInfo
