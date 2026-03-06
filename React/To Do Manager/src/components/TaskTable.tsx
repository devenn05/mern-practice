import React, { useEffect, useState } from 'react'
import {useTasks, type Task } from './TaskContext';
import TaskCard from './TaskCard';

interface tasksProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskTable: React.FC = () => {
    const { tasks, setTasks } = useTasks(); 
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [editTask, setEditTask] = useState<Task | null>(null)

    const [now, setNow] = useState(Date.now());

    const [viewingTask, setViewingTask] = useState<Task | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const tasksPerPage = 5;

    const indexOfLastTask = currentPage * tasksPerPage
    const indexOfFirstTask = indexOfLastTask - tasksPerPage
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)
    const totalPages = Math.ceil(tasks.length / tasksPerPage)

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [tasks.length, currentPage, totalPages]);

    useEffect(()=>{
        const timer = setInterval(()=>setNow(Date.now()), 1000);
        return ()=> clearInterval(timer)
    }, [])

    const getRemainingTime = (dueDate?: string) => {
    if (!dueDate) return "No Limit";

    const target = new Date(dueDate).getTime();
    const difference = target - now;

    if (difference <=0 ){
        return "Overdue"
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
    

    const startEditing = (index: number, task: Task) =>{
        setEditIndex(index);
        setEditTask({...task})
    }

    const saveEdit = () =>{
        if (editTask && editIndex !== -1){
            const updatedTask = [...tasks];
            updatedTask[editIndex] = editTask
            setTasks(updatedTask);
            setEditIndex(-1)
        }
    }

    const handleDelete = (indexToDelete: number)=>{
        const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(updatedTasks);
    }

    const handleStatus = (indexToChangeStatus: number) =>{
        const updatedTasks = tasks.map((task, index) => {
        if (index === indexToChangeStatus) {
            return { ...task, status: !task.status };
        }
        return task;
    });
    setTasks(updatedTasks);  
    }

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
        {(tasks.length >= 1) && 
        <>
            <table style={{width: '50%'}}>
            <thead>
                <tr>
                    <td>No.</td>
                    <td>Title</td>
                    <td>Status</td>
                    <td>Priority</td>
                    <td>Due Date</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {currentTasks.map((task, index)=>{
                    const absoluteIndex = indexOfFirstTask + index;
                    const isEditing = editIndex === index
                    return (
                        <tr key={absoluteIndex || task.id}>
                            <td>{absoluteIndex+1}</td>
                            <td>{isEditing ? (
                                <input type="text" onChange={(e)=>setEditTask({...editTask!, title: e.target.value})} value={editTask?.title} placeholder={task.title} />
                            ) : (task.title)}</td>

                            <td>
                                {isEditing ? (                       
                                    <input type="checkbox" checked={editTask?.status} onChange={(e) => setEditTask({...editTask!, status: e.target.checked})} />
                                  ) : (
                                    task.status ? (
                                      <span>Completed</span>
                                    ) : (
                                      <button onClick={() => handleStatus(absoluteIndex)}>
                                        Complete
                                      </button>
                                    )
                                  )}
                                </td>

                            <td>{isEditing ? (
                                <select value={editTask?.priority} onChange={(e)=> setEditTask({...editTask!, priority: e.target.value as any})}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            ) : task.priority}</td>
                            <td>
                                {isEditing ? (
                                <input 
                                  type="datetime-local" 
                                  value={editTask?.dueDate || ''} 
                                  onChange={(e) => setEditTask({...editTask!, dueDate: e.target.value})} 
                                />
                                ) : (
                                    getRemainingTime(task.dueDate)
                                )}
                            </td>

                            <td>
                                {isEditing ? (
                                    <>
                                        <button onClick={saveEdit}>Save</button>
                                        <button onClick={() => setEditIndex(-1)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setViewingTask(task)}>View</button>
                                        <button onClick={() => startEditing(absoluteIndex, task)}>Update</button>
                                        <button onClick={() => handleDelete(absoluteIndex)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div>
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>
        }
        {viewingTask && (
         <TaskCard task={viewingTask} onClose={() => setViewingTask(null)} />
      )}
    </div>
  )
}

export default TaskTable


