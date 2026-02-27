import React, { useContext } from 'react'
import { NameContext } from './Context'

const ComponentC = () => {
    const name = useContext(NameContext);
  return (
    <div className="box">
        <h1>{`Hello ${name}`}</h1>
    </div>
  )
}

export default ComponentC
