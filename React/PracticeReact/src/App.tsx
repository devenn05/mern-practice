import { useState } from 'react'
import './App.css'
import {FirstHook, SecondHook, ThirdHook, FourthHook, FifthHook, SixthHook, SeventhHook, EightHook,NinthHook, TenthHook} from './components/Hooks';
import {Props, Users} from './components/Props';
import ComponentMain from './components/Context';
function App() {
  return (
    <div>
      <ComponentMain></ComponentMain>
      <Users></Users>

      <Props name="Deven" age ={23} language = "Python"></Props>
      <Props name="Harsh" age ={19} language = "JavaScript"></Props>

      <FirstHook></FirstHook>
      <SecondHook></SecondHook>
      <ThirdHook></ThirdHook>
      <FourthHook></FourthHook>
      <FifthHook></FifthHook>
      <SixthHook></SixthHook>
      <SeventhHook></SeventhHook>
      <EightHook></EightHook>
      <NinthHook></NinthHook>
      <TenthHook></TenthHook>
    </div>
  )
}

export default App

