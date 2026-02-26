import { useState } from 'react'
import './App.css'
import {FirstHook, SecondHook, ThirdHook, FourthHook, FifthHook, SixthHook, SeventhHook, EightHook,NinthHook} from './components/Hooks';


function App() {
  return (
    <div>
      <FirstHook></FirstHook>
      <SecondHook></SecondHook>
      <ThirdHook></ThirdHook>
      <FourthHook></FourthHook>
      <FifthHook></FifthHook>
      <SixthHook></SixthHook>
      <SeventhHook></SeventhHook>
      <EightHook></EightHook>
      <NinthHook></NinthHook>
    </div>
  )
}

export default App

