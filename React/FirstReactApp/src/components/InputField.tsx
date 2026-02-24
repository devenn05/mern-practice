import React, { useState, type ChangeEvent } from 'react'

const InputField = () => {
    const [name, setName] = useState<string>('');
    const [nameList, setNameList] = useState<string[]>([]);
    const handleEntryChange = (e: ChangeEvent<HTMLInputElement>): void =>{
        setName(e.target.value);
    }
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void =>{
        e.preventDefault()
        if (name.trim()){
            setNameList([...nameList, name.trim()]);
            console.log(`${name} is added.`);
            setName('');
        }
    }
  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleEntryChange} placeholder='Enter your name' />
        <button type='submit'>Send</button>
    </form>
    <p>Length: {nameList.length}</p>
    </div>
  )
}

export default InputField
