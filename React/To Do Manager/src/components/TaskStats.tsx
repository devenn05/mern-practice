import React, { useMemo } from 'react'
import type { Task } from '../App'

const TaskStats: React.FC<{tasks: Task[]}> =({tasks}) => {
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
        <span>Total: {stats.total}</span>
        <span>Completed: {stats.completed}</span>
        <span>Pending: {stats.pending}</span>
        <span>Urgent High-Priority: {stats.highPriority}</span>
    </div>
  )
}

export default TaskStats
