import React, { useState, type ChangeEvent, type FormEvent } from 'react'

interface Person{
    name: string,
    age: string,
    gender: string
}

const InputField = () => {
    const [formData, setFormData] = useState<Person>({
        name: '',
        age: '',
        gender: 'Other'
    });
    const [people, setPeople] = useState<Person[]>([]);
    
    const updateName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = e.target.value;
        setFormData({...formData, name: newValue});
    }
    const updateAge = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = e.target.value;
        setFormData({...formData, age: newValue});
    }
    const updateGender = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        const newValue = e.target.value;
        setFormData({...formData, gender: newValue});
    }
    const handleSubmit = (e: FormEvent)=>{
        e.preventDefault();
        setPeople([...people, formData]);
        setFormData({name: '', age: '', gender: 'Other'})
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input type="text" value={formData.name} onChange={updateName} placeholder='Enter your Name' />
        <input type="number" value={formData.age} onChange={updateAge} placeholder='Enter your Age' />
        <select value={formData.gender} onChange={updateGender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        <button type='submit'>Add Person</button>
    </form>
    <table>
        <thead>
            <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>

            </tr>
        </thead>
        <tbody>
            {people.map((item, index)=>(
                <tr key = {index}>
                    <th>{index + 1}</th>
                    <th>{item.name}</th>
                    <th>{item.age}</th>
                    <th>{item.gender}</th>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  )
}

export default InputField
