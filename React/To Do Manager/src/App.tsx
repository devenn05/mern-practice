import { useEffect, useState } from 'react'
import './App.css'
import Taskbar from './components/Taskbar'
import TaskTable from './components/TaskTable'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export interface Task{
  id: string,
  title:string,
  status: boolean,
  priority: 'low' | 'medium' | 'high'
  dueDate?: string 
}


function App() {
  const [tasks, setTasks] = useState<Task[]>(()=>{
    const saved = localStorage.getItem('my_tasks')
    if (saved){
      return JSON.parse(saved)
    }
    return [];
  })

  useEffect(()=>{
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
  }, [tasks])

  return (
    <>
      <Router>

        <nav>
          <Link to="/">Add tasks</Link>
          <Link to="/tasks">View Tasks</Link>
        </nav>

      <Routes>
        <Route path='/' element={<Taskbar tasks={tasks} setTasks={setTasks} />}></Route>
        <Route path='/tasks' element={<TaskTable tasks= {tasks} setTasks={setTasks} ></TaskTable>}></Route>
      </Routes>
      
      </Router>
    </>
  )
}

export default App

