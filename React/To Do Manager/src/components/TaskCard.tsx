import React from 'react'
import type { Task } from './TaskContext';

interface TaskProps {
    task: Task;
    onClose: () => void
}

const TaskCard: React.FC<TaskProps> = ({task, onClose}) => {
  return (
    <div onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
            <div>
                <h2>{task.title}</h2>
                <button onClick={onClose}>X</button>
            </div>
            <p><strong>Status:</strong> {task.status ? "Completed" : "Pending"}</p>
            <p><strong>Priority:</strong> {task.priority.toUpperCase()}</p>
            <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleString() : 'No Deadline'}</p>
        </div>
    </div>
  )
}

export default TaskCard

