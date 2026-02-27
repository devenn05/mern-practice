import React, { useContext } from 'react'
import ComponentC from './ComponentC'
import { NameContext } from './Context'

const ComponentB = () => {
    const user = useContext(NameContext)
  return (
    <div className="box">
        <h1>Hello {user}</h1>
        <ComponentC></ComponentC>
    </div>
  )
}

export default ComponentB
