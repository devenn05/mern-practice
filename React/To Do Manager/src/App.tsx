import { useEffect, useState } from 'react'
import './App.css'
import Taskbar from './components/Taskbar'
import TaskTable from './components/TaskTable'
import TaskStats from './components/TaskStats'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { TaskProvider } from './components/TaskContext'


function App() {
  return (
    <TaskProvider>
      <>
      <Router>
        <nav>
          <Link to="/">Add tasks</Link>
          <Link to="/tasks">View Tasks</Link>
          <Link to='/stats'>Task Stats</Link>
        </nav>

      <Routes>
        <Route path='/' element={<Taskbar/>}></Route>
        <Route path='/tasks' element={<TaskTable></TaskTable>}></Route>
        <Route path='/stats' element={<TaskStats></TaskStats>}></Route>
        <Route path='*' element={<h1>Incorrect Url</h1>}></Route>
      </Routes>
      
      </Router>
    </>
    </TaskProvider>
  )
}

export default App

