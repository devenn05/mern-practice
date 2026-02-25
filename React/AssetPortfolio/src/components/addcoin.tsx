import React, { useState } from 'react'
import type { Coin } from '../model';
import { useNavigate } from 'react-router-dom';

interface AddCoinProps {
  onAdd: (coin: Coin) => void;
}

const Addcoin: React.FC<AddCoinProps> = ({onAdd}) => {
    const [symbol, addSymbol] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        onAdd({id: Date.now().toString(), name, symbol, quantity});
        navigate('/');
    }
  return (
    <div>
      <h2>Add New Pair</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=> setName(e.target.value)} placeholder='Pair Name' />
        <input type="text" onChange={(e)=> addSymbol(e.target.value)} placeholder='Pair Symbol' />
        <input type="number" onChange={(e)=> setQuantity(Number(e.target.value))} placeholder='Quantity' />
        <button type='submit'>Add Pair</button>
      </form>
    </div>
  )
}

export default Addcoin

