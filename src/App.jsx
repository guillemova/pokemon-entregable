import { useSelector } from "react-redux"
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import './App.css'
import Pokedex from './pages/Pokedex'
import PokedexInfo from "./pages/PokedexInfo"
import ProtectedRoutes from "./components.jsx/ProtectedRoute"



function App() {

  const nameTrainer = useSelector( state => state.trainer)

  return (
    <div className="App">
  <Routes>
    <Route path="/" element={<Home/>}/>
    {/* //ruta anidada */}
    <Route element={<ProtectedRoutes/>}>
      <Route path="/pokedex" element={<Pokedex/>}/>
      <Route path="pokedex/:id" element={<PokedexInfo/>}/>
    </Route>
  </Routes>
    </div>
  )
}

export default App
