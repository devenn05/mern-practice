import React, { useEffect, useState } from 'react'
import {useTasks, type Task } from './TaskContext';
import TaskCard from './TaskCard';

interface tasksProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

type SortField = 'id' | 'status' | 'priority' | 'dueDate' | null;
type SortDirection = 'asc' | 'desc';

const TaskTable: React.FC = () => {
    const { tasks, setTasks } = useTasks(); 
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [editTask, setEditTask] = useState<Task | null>(null)

    const [now, setNow] = useState(Date.now());

    const [viewingTask, setViewingTask] = useState<Task | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const tasksPerPage = 5;

    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const [searchTerm, setSearchTerm] = useState('');

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
    

     const startEditing = (originalIndex: number, task: Task) => {
        setEditIndex(originalIndex);
        setEditTask({...task})
    }

    const saveEdit = () => {
        if (editTask && editIndex !== -1){
            const updatedTask = [...tasks];
            updatedTask[editIndex] = editTask
            setTasks(updatedTask);
            setEditIndex(-1)
        }
    }

    const handleDelete = (originalIndex: number) => {
        const updatedTasks = tasks.filter((_, index) => index !== originalIndex);
        setTasks(updatedTasks);
    }

    const handleStatus = (originalIndex: number) => {
        const updatedTasks = tasks.map((task, index) => {
            if (index === originalIndex) {
                return { ...task, status: !task.status };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    const mappedTasks = tasks.map((task, index) => ({ task, originalIndex: index }));

    const filteredTasks = mappedTasks.filter(({ task }) => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (!sortField) return 0;

        let comparison = 0;

        if (sortField === 'id') {
            comparison = a.originalIndex - b.originalIndex;
        } 
        else if (sortField === 'status') {
            comparison = (a.task.status === b.task.status) ? 0 : a.task.status ? 1 : -1;
        } 
        else if (sortField === 'priority') {
            const weights = { low: 1, medium: 2, high: 3 };
            comparison = weights[a.task.priority] - weights[b.task.priority];
        } 
        else if (sortField === 'dueDate') {
            const timeA = a.task.dueDate ? new Date(a.task.dueDate).getTime() : Infinity;
            const timeB = b.task.dueDate ? new Date(b.task.dueDate).getTime() : Infinity;
            comparison = timeA - timeB;
        }

        return sortDirection === 'asc' ? comparison : -comparison;
    });

    const indexOfLastTask = currentPage * tasksPerPage
    const indexOfFirstTask = indexOfLastTask - tasksPerPage
    const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(tasks.length / tasksPerPage) || 1;

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [tasks.length, currentPage, totalPages]);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


    const renderSortArrow = (field: SortField) => {
        if (sortField !== field) return '';
        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    };
  return (
    <div>
        {(tasks.length >= 1) && 
        <>
            <div>
                <input 
                    type="text" 
                    placeholder="Search tasks by title..." 
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <table style={{width: '50%'}}>
            <thead>
                <tr>
                    <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('id')}>No.{renderSortArrow('id')}</th>
                        <th>Title</th>
                        <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('status')}>Status{renderSortArrow('status')}</th>
                        <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('priority')}>Priority{renderSortArrow('priority')}</th>
                        <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('dueDate')}>Due Date{renderSortArrow('dueDate')}</th>
                        <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentTasks.map(({ task, originalIndex }) => {
                    const isEditing = editIndex === originalIndex;
                    return (
                        <tr key={originalIndex || task.id}>
                            <td>{originalIndex+1}</td>
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
                                      <button onClick={() => handleStatus(originalIndex)}>
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
                                        <button onClick={() => startEditing(originalIndex, task)}>Update</button>
                                        <button onClick={() => handleDelete(originalIndex)}>Delete</button>
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


