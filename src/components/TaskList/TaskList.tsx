import React, { useState } from 'react';
// Imports a specific Hook from React;  
// useState lets your component store and update state
import type { TaskListProps, TaskStatus, TaskPriority } from '../../types'; //compoenets inport
//Defining the React Functional component 'TaskList', that receives props matching TaskListProps. 
// Here we are using Destructuring of props
export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onStatusChange,
    onDelete
}) => {
    //useState returns an array [state, setState], and we destructure it into two variables.
    const [searchQuery, setSearchQuery] = useState('');
    //Stores user input for search Initial value = '' (empty string)
    const [sortBy, setSortBy] = useState<'priority' | 'status'>('priority');
    //Storing sorting preference with Type restricted priotity or status, default priority
    const [newTaskTitle, setNewTaskTitle] = useState(''); // for stroing local state

    const handleAddTask = () => {
        console.log('Add task clicked:', newTaskTitle);
        setNewTaskTitle('');
    };
    // Adding delete functionality
    const handleDelete = (taskId: string) => {
        if (onDelete) {
            onDelete(taskId);
        }
    };
    // Adding search functionality
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //  Adding sorting functionality along with search
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === 'priority') {
            const order: Record<TaskPriority, number> = {
                high: 3,
                medium: 2,
                low: 1
            };
            return order[b.priority] - order[a.priority];
        } else {
            const order: Record<TaskStatus, number> = {
                pending: 1,
                'in-progress': 2,
                completed: 3
            };
            return order[a.status] - order[b.status];
        }
    });
    // Returning the component with a single parent
    //Adding Task, Search input fields; Sort dropdown field
    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <h2 className="text-lg font-semibold text-slate-900">Task List</h2>
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                        <input
                            type="text"
                            placeholder="Enter task.."
                            value={newTaskTitle}
                            onChange={e => setNewTaskTitle(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        />
                        <button
                            onClick={handleAddTask}
                            className="rounded-2xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value as 'priority' | 'status')}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        >
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                </div>
            </div>

            <ul className="space-y-4">
                {sortedTasks.map(task => (
                    <li key={task.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-base font-semibold text-slate-900">{task.title}</p>
                                {task.description && (
                                    <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                                )}
                                <p className="text-sm text-slate-600">{task.priority} • {task.status}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <select
                                    value={task.status}
                                    onChange={e => onStatusChange(task.id, e.target.value as TaskStatus)}
                                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="rounded-2xl bg-rose-500 px-4 py-3 text-white transition hover:bg-rose-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default TaskList;