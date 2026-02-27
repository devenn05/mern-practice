import React, { useEffect, useState } from 'react'

const CoinPrice = ({ symbol }: { symbol: string }) => {
    const [price, setPrice] = useState<string>('...');
    useEffect(() => {
    fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`)
      .then(res => res.json())
      .then(data => {
        if (data.price) {
          setPrice(parseFloat(data.price).toLocaleString());
        }
      })
      .catch(() => setPrice('Error'));
  }, [symbol]);
  return (
    <div>
      {price}
    </div>
  )
}

export default CoinPrice
