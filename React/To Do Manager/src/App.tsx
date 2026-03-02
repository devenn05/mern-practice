import { useEffect, useState } from 'react'
import './App.css'
import Taskbar from './components/Taskbar'
import TaskTable from './components/TaskTable'

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
      <Taskbar tasks={tasks} setTasks={setTasks} />
      <TaskTable tasks= {tasks} setTasks={setTasks} ></TaskTable>
    </>
  )
}

export default App

