import { useState } from 'react'
import './App.css'
import Taskbar from './components/Taskbar'
import TaskTable from './components/TaskTable'

export interface Task{
  title:string,
  status: boolean,
  priority: 'low' | 'medium' | 'high'
}


function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  return (
    <>
      <Taskbar tasks={tasks} setTasks={setTasks} />
      <TaskTable tasks= {tasks} setTasks={setTasks} ></TaskTable>
    </>
  )
}

export default App

