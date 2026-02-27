import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import type { Coin } from '../model'
import CoinPrice from './CoinPrice';

interface CoinProp{
        coins: Coin[],
    }

const Dashboard: React.FC<CoinProp> = ({ coins }) => {
    
  return (
    <div>
      <h1>My Portfolio</h1>
      {coins.length ===0 ? (
        <p>No Coins added yet.</p>
      ) : (
        <ul>
            {coins.map((coin)=>(
                <li key={coin.id}>
                    <Link to={`/coin/${coin.id}`}> {coin.symbol} - {coin.quantity} Units Price:  <CoinPrice symbol={coin.symbol}/></Link>
            </li>
            ))}
            
        </ul>
      )
      }
    </div>
  )
}

export default Dashboard

