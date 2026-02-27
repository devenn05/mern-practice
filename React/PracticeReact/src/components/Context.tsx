import React, { useState } from 'react'
import ComponentA from './ComponentA'
import { createContext } from 'react'

export const NameContext = createContext< string| undefined>(undefined);

const ComponentMain = () => {
const [name, setName] = useState<string>('admin')
  return (
    <div className="box">
      <h1>Hello {name}</h1>
      <NameContext.Provider value = {name}>
        <ComponentA></ComponentA>
      </NameContext.Provider>
    </div>
  )
}

export default ComponentMain
