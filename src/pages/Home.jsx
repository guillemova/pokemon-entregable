import React from 'react'
import { useDispatch } from 'react-redux'
import { setTrainerGlobal } from '../store/slices/trainner.slice'
import { useNavigate } from 'react-router-dom'
import "../components.jsx/pokedex/styles/home.css"



const Home = () => {

  const dispatch =  useDispatch()
 const navigate = useNavigate()

    const handleSubmit = e =>{
        e.preventDefault()
        dispatch(setTrainerGlobal(e.target.name.value.trim()))
        e.target.name.value = ""
        navigate("/pokedex")
    }

  return (
    <div className='trainer__container'>
        <img src="Home/pokedex.png" alt="" />
        <h1 className='home__title'>Hi Trainer!!</h1>
        <p className='home__text'>Give Me Your Name To Start</p>
        <form className='home__form' onSubmit={handleSubmit} action="">
            <input className='home__input'  id="name" type="text" placeholder='Trainer' />
            <button className='home__button'>Start Your Adventure</button>
        </form>
    </div>
  )
}

export default Home