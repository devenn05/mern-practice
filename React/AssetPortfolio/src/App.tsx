import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import type { Coin } from './model'
import './App.css'
import Dashboard from './components/dashboard';
import Addcoin from './components/addcoin';
import Coincard from './components/coincard';

function App() {
  const [asset, setAsset] = useState<Coin[]>([])
  const addNewCoin = (newCoin: Coin) =>{
    setAsset([...asset, newCoin])
  }
  return (
    <BrowserRouter>
    <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Pair</Link>
    </nav>
    <Routes>
      <Route path='/add' element={<Addcoin onAdd={addNewCoin}/>}></Route>
      <Route path='/' element={<Dashboard coins={asset}/>}></Route>
      <Route path='/coin/:id' element={<Coincard assets={asset}/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App