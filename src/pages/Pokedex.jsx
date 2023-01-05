import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PokeCard from '../components.jsx/PokeCard'
import Pagination from '../components.jsx/Pagination'
import "../components.jsx/pokedex/styles/pokedex.css"

const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [types, setTypes] = useState()
  const [typeSelected , setTypeSelected  ] = useState("All Pokemons")

  const navigate = useNavigate()

  useEffect(()=>{
    if(typeSelected !== "All Pokemons"){
      //hacer la peticion de los pokemones por tipo
      axios.get(typeSelected)
      .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
      .catch(err => console.log(err))
    }
    else{
      // hacer la peticion de todos los pokemones
      const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150000'
      axios.get(URL)
      .then(res => setPokemons(res.data.results))
      .catch(err => console.log(err))
    }
  },[typeSelected])

  useEffect(()=>{
    //Peticion para tipos de Pokemon
    const URL = "https://pokeapi.co/api/v2/type"
    axios.get(URL)
    .then(res => setTypes(res.data.results))
    .catch(err => console.log(err))
  },[])

 const {trainer} = useSelector(state => state)
 
 const handleSubmit = e => {
  e.preventDefault()
  const input = e.target.search.value.trim().toLowerCase()
  navigate(`/pokedex/${input}`)
 }
  const handleChange = e => {
    setTypeSelected(e.target.value)
    setPage(1)
  }



  //Logica paginacion
  const [page, setPage] = useState(3)
  const [pokemonPerPage, setPokemonPerPage] = useState(8)
  const initialPokemon = (page -1) * pokemonPerPage
  const finalPokemon = page * pokemonPerPage
  const maxPage = pokemons && Math.ceil(pokemons.length / pokemonPerPage)



  return (
    <div>
      <h2 className='pokedex__title'>Welcome {trainer}, you can find your favorite pokemon.</h2>
      <div className='pokedex__container'>

      <form className='pokedex__form' onSubmit={handleSubmit}>
        <input className='pokedex__input' id="search" type="text" placeholder='Pikachu'/>
        <button className='pokedex__button'>Catch Them All</button>
      </form>
      <select className='pokedex__select' onChange={handleChange}>
        <option value={"All Pokemons"}>All Pokemons</option>
        { types?.map(type => (
          <option key={type.url} value={type.url}>{type.name}</option>
          )) }
      </select>
      </div>
      <Pagination 
        page={page}
        maxPage={maxPage}
        setPage={setPage} />
      <div  className='poke__container'>
        {
          pokemons?.slice(initialPokemon, finalPokemon).map(pokemon => (
            <PokeCard 
              key={pokemon.url}
              url={pokemon.url}
              />
          ))

        }
      </div>
      <Pagination 
        page={page}
        maxPage={maxPage}
        setPage={setPage} />
    </div>
  )
}

export default Pokedex