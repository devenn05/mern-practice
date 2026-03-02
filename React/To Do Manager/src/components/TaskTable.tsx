import React, { useState } from 'react'
import type { Task } from '../App';

interface tasksProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskTable: React.FC<tasksProps> = ({tasks, setTasks}) => {
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [editTask, setEditTask] = useState<Task | null>(null)

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

  return (
    <div>
        {(tasks.length >= 1) && <table style={{width: '50%'}}>
            <thead>
                <tr>
                    <td>No.</td>
                    <td>Title</td>
                    <td>Status</td>
                    <td>Priority</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index)=>{
                    const isEditing = editIndex === index
                    return (
                        <tr>
                            <td>{index+1}</td>
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
                                      <button onClick={() => handleStatus(index)}>
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
                                    <>
                                        <button onClick={saveEdit}>Save</button>
                                        <button onClick={() => setEditIndex(-1)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditing(index, task)}>Update</button>
                                        <button onClick={() => handleDelete(index)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>}
    </div>
  )
}

export default TaskTable
