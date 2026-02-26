import { useState } from 'react'
import './App.css'
import {FirstHook, SecondHook, ThirdHook, FourthHook, FifthHook, SixthHook} from './components/Hooks';


function App() {
  return (
    <div>
      <FirstHook></FirstHook>
      <SecondHook></SecondHook>
      <ThirdHook></ThirdHook>
      <FourthHook></FourthHook>
      <FifthHook></FifthHook>
      <SixthHook></SixthHook>
    </div>
  )
}

export default App

