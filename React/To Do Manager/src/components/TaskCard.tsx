import React from 'react'
import type { Task } from '../App'

interface TaskProps{
    task: Task;
    onClose: () => void
}

const TaskCard: React.FC<TaskProps> = ({task, onClose}) => {
  return (
    <div onChange={onClose}>
        <div onClick={(e)=> e.stopPropagation}>
            <div>
                <h2>{task.title}</h2>
                <button onClick={onClose}>X Close</button>
            </div>
            <p><strong>Status:</strong> {task.status ? "Completed" : "Pending"}</p>
            <p><strong>Priority:</strong> <span className={`badge ${task.priority}`}>{task.priority.toUpperCase()}</span></p>
            <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleString() : 'No Deadline'}</p>

        </div>
    </div>
  )
}

export default TaskCard
