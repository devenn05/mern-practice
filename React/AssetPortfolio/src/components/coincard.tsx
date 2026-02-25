import React from 'react'
import type { Coin } from '../model'
import { useParams } from 'react-router-dom';

interface DetailProps {
  assets: Coin[];
}

const Coincard: React.FC<DetailProps>  = ({assets}) => {
    const {id} = useParams<{id: string}>()
    const coin = assets.find((e)=> e.id === id);
    if (!coin) return <h1>Coin not Found</h1>
  return (
    <div>
      <h1>{coin.name}</h1>
      <h4>{coin.symbol}</h4>
      <p>Quantity: {coin.quantity}</p>
    </div>
  )
}

export default Coincard
