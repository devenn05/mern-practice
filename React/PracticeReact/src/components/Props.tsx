import React, { useState, type FormEvent } from 'react'
import { EleventhHook } from './Hooks'

type EngineerProp = {
    name: string,
    age: number,
    language: string
}

export const Props = ({name, age, language}: EngineerProp) => {
  return (
    <div>
      <h1>My name is {name}</h1>
      <p>I am {age} and I love {language}</p>
    </div>
  )
}

export default Props

interface Employee{
    name: string,
    age: number,
    gender: string,
    salary: number
}
export const Users = ()  => {
    const [user, setUser] = useState<Employee>({name: '', age: 0, gender: '', salary: 0})
    const [users, setUsers] = useState<Employee[]>([])

    const handleSubmit = (e: FormEvent) =>{
        e.preventDefault()
        setUsers([...users, user])
        setUser({name: '', age: 0, gender: '', salary: 0})
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={user.name} onChange={e=> setUser({...user, name: e.target.value})} />
            <input type="number" value={user.age} onChange={e=> setUser({...user, age: Number(e.target.value)})} />
            <input type="text" value={user.gender} onChange={e=> setUser({...user, gender: e.target.value})} />
            <input type="number" value={user.salary} onChange={e=> setUser({...user, salary: Number(e.target.value)})} />
            <button type='submit'>Submit</button>
        </form>
        <EleventhHook  users = {users} ></EleventhHook>
        </>
    )
}
