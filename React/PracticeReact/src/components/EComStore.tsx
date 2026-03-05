import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleTheme } from '../store/uiSlice';
import type { UserProfile } from '../types';
import { addUser } from '../store/userSlice';

const EComStore = () => {
    const dispatch = useAppDispatch();
    const isDark = useAppSelector((state)=> state.ui.isDarkMode)
    const themeStyles = {
    backgroundColor: isDark ? 'black' : '#FFF',
    color: isDark ? 'white' : 'black',
    minHeight: '100vh',
  };

  const {userList} = useAppSelector((state)=> state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const country = 'India';

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const newUser: UserProfile = {name,email,address: {city,country}};
    dispatch(addUser(newUser));
    setName('');
    setEmail('');
    setCity('');
  }

  return (
    <>
        <div style={themeStyles}>
            <span>Theme: <button onClick={()=> dispatch(toggleTheme())}>Mode</button> <br /></span>
            <br />
            <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required placeholder='name'/>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder='email'/>
                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} required placeholder='city'/>
                <button type='submit'>Submit</button>
            </form>
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>City</td>
                        <td>Country</td>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index)=>(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address.city}</td>
                            <td>{user.address.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    </>
  )
}

export default EComStore
