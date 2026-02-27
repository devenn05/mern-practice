import React, { Component } from 'react'

interface Employee {
  name: string;
  age: string;
  gender: string;
}

interface EmployeeState{
    employees: Employee[]
    name: string,
    age: string,
    gender: string
}

export default class Work extends Component<{}, EmployeeState> {
  state: EmployeeState = {
    employees: [],
    name: '',
    age: '',
    gender: 'male'
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    const {name, value} = e.target;
    this.setState({[name]: value} as any)
  }

  handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault()
    const newEmp: Employee ={
        name: this.state.name,
        age: this.state.age,
        gender: this.state.gender
    }

    this.setState({
        employees: [...this.state.employees, newEmp],  
        name: '',
        age: '',
        gender: 'male'})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <input type="text" name='name' value={this.state.name} onChange={this.handleChange} />
            <input type="text" name='age' value={this.state.age} onChange={this.handleChange} />
            <input type="text" name='gender' value={this.state.gender} onChange={this.handleChange} />
            <button type='submit'>Submit</button>
        </form>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>
                {this.state.employees.map((employee, index)=>(
                    <tr key={index}>
                        <th>{employee.name}</th>
                        <th>{employee.age}</th>
                        <th>{employee.gender}</th>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    )
  }
}
