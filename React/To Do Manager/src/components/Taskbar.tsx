import React, { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Task } from '../App'
import { useNavigate } from 'react-router-dom';

interface tasksProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Taskbar: React.FC<tasksProps> = ({tasks, setTasks}) => {
    const navigate = useNavigate();

    const [currentTime, setCurrentTime] = useState<number>(Date.now())
    const InputRef = useRef<HTMLInputElement>(null)
    const [title,setTitle] = useState<string>('')
    const [status,setStatus] = useState<boolean>(false)
    const [priority,setPriority] = useState<Task['priority']>('medium')
    const [hasDueDate, setHasDueDate] =useState<boolean>(false)
    const [dueDate, setDueDate] = useState<string>('')

    useEffect(()=>{
        InputRef.current?.focus();
    },[])

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentTime(Date.now())
        },1000)
        return () => clearInterval(timer);
    }, [])


    const handleSubmit =(e: FormEvent)=>{
        e.preventDefault()
        const newTask: Task = {id: crypto.randomUUID(), title, status, priority, ...(hasDueDate && dueDate ? {dueDate: dueDate} : {})}
        setTasks([...tasks, newTask])
        setTitle('')
        setStatus(false)
        setPriority('medium')
        setHasDueDate(false);
        setDueDate('');
        InputRef.current?.focus();
        navigate('/')
    }

  return (
    <div className='Task-bar'>
        <strong>{new Date(currentTime).toLocaleDateString()} : {new Date(currentTime).toLocaleTimeString()}</strong>
      <form onSubmit={handleSubmit}>
        <span>Title: <input ref={InputRef} type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></span>
        <label> Status: <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} /></label>
        <span>Priority: <select value={priority} onChange={(e)=> setPriority(e.target.value as any)}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select></span>
        <label>
          <input type="checkbox" checked={hasDueDate} onChange={(e) => setHasDueDate(e.target.checked)} />
          Set Due Date:
        </label>

        {hasDueDate && (
          <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        )}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Taskbar


