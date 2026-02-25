import React, { useEffect, useState } from 'react'

export const FirstHook = () => {
    const [count, setCount] = useState<number>(0);

    const add = ()=> {
        setCount(e=> e + 1)
    }

    function subtract(){
        setCount(e => e-1)
    }
  return (
    <div>
      <button onClick={add}> Add </button>
      <strong>{count}</strong>
      <button onClick={subtract}> Subtract </button>
    </div>
  )
}

export const SecondHook = () =>{
    const [number, setNumber] = useState<string>('')
    const [myList, addInList] = useState<string[]>(['1','2','3','4','5'])
    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        addInList([...myList, number]);
        setNumber('');
        console.log(myList)
    }
    const seeList = useEffect(()=>{
        console.log(myList)
    }, []);
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="number" value={number} onChange={e=> setNumber(e.target.value)} placeholder=''/>
            <button type='submit'>Add</button>
        </form>
        <ul>
            {myList.map((num, index) =>(
                <li key={index}>{num}</li>
            ))}
        </ul>
        </>
    )
}

interface Citizen{
    name: string,
    age: number,
    gender: string,
    securityNumber: string,
    address: string
}

export const ThirdHook = () => {
    const [citizen, setCitizen] = useState<Citizen>({name: '', age: 0, gender: '', securityNumber: '', address:''})
    const [data, setData] = useState<Citizen[]>([])

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        setData([...data, citizen])
        setCitizen({name: '', age: 0, gender: '', securityNumber: '', address:''})
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={citizen.name} onChange={e=> setCitizen({...citizen, name: e.target.value})} placeholder='Name' />
                <input type="number" value={citizen.age} onChange={e=> setCitizen({...citizen, age: Number(e.target.value)})} placeholder='Age' />
                <input type="text" value={citizen.gender} onChange={e=> setCitizen({...citizen, gender: e.target.value})} placeholder='Gender' />
                <input type="text" value={citizen.securityNumber} onChange={e=> setCitizen({...citizen, securityNumber: e.target.value})} placeholder='Security Number' />
                <input type="text" value={citizen.address} onChange={e=> setCitizen({...citizen, address: e.target.value})} placeholder='Address' />
                <button type='submit'>Submit</button>
            </form>

            <table style={{width: '60%'}}>
                <thead>
                    <tr>
                        <td>Index</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Gender</td>
                        <td>Security Number</td>
                        <td>Address</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entity, index)=>(
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <th>{entity.name}</th>
                            <th>{entity.age}</th>
                            <th>{entity.gender}</th>
                            <th>{entity.securityNumber}</th>
                            <th>{entity.address}</th>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}



