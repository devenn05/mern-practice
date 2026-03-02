import React, { useMemo } from 'react'
import { useTasks } from './TaskContext';

const TaskStats: React.FC = () => {
    const { tasks } = useTasks(); 

    const stats = useMemo(()=>{
        const completed = tasks.filter(t=> t.status).length;
        const highPriority = tasks.filter(t=> t.priority === 'high' && !t.status).length;
        return {
            total: tasks.length,
            completed,
            pending: tasks.length - completed,
            highPriority
        }
    }, [tasks]);

  return (
    <div>
        <h3>Statistics</h3>
        <p>Total: {stats.total}</p>
        <p>Completed: {stats.completed}</p>
        <p>Pending: {stats.pending}</p>
        <p>Urgent High-Priority: {stats.highPriority}</p>
    </div>
  )
}

export default TaskStats