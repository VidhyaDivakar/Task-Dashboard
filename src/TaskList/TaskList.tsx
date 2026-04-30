import React, { useState } from 'react';
// Imports a specific Hook from React;  
// useState lets your component store and update state
import type { TaskListProps, TaskStatus, TaskPriority } from '../types'; //compoenets inport
//Defining the React Functional component 'TaskList', that receives props matching TaskListProps. 
// Here we are using Destructuring of props
export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onStatusChange
}) => {
    //useState returns an array [state, setState], and we destructure it into two variables.
    const [searchQuery, setSearchQuery] = useState('');
    //Stores user input for search Initial value = '' (empty string)
    const [sortBy, setSortBy] = useState<'priority' | 'status' > ('priority');
    //Storing sorting preference with Type restricted priotity or status, default priority
    const [newTaskTitle, setNewTaskTitle] = useState(''); // for stroing local state

    const handleAddTask = () => {
        console.log('Add task clicked:', newTaskTitle);
        setNewTaskTitle('');
    };
    // Adding detele functionality
    const handleDelete = (taskId: string) => {
        console.log('Delete task:', taskId);
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
        <div>
            <h2>Task List</h2>
            <div>
                <input type="text" placeholder="Enter task.." value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                />
                <button onClick={handleAddTask}>Add</button>
            </div>
            {/*Adding search field*/}
            <div>
                <input type="text" placeholder="Search tasks..." value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            {/*Adding filter */}
            <div>
                <label> Sort By</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value as 'priority' | 'status')}>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                </select>
            </div>
            {/*Displaying the Task List on the UI*/}
            <ul>
                {sortedTasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.title}</strong>({task.priority}) - {task.status}
                        {/*Adding functionality to update status change*/}
                        <select
                            value={task.status}
                            onChange={e => onStatusChange(task.id, e.target.value as TaskStatus)}>
                            <option value="pending"> Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        {/*Adding button to delete task*/}
                        <button onClick={() => handleDelete(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};