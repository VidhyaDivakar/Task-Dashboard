import React, { useState }  from 'react';
// Imports a specific Hook from React;  
// useState lets your component store and update state
import type { Task, TaskStatus, TaskPriority } from '../types'; //compoenets inport
//Defining the React Functional component 'TaskList', that receives props matching TaskListProps. 
// Here we are using Destructuring of props
export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onStatusChange
    }) => {
        //useState returns an array [state, setState], and we destructure it into two variables.
        const [searchQuery, setSearchQuery] = useState('');
        //Stores user input for search Initial value = '' (empty string)
        const [sortBy, setSortBy] = useState'priority' | 'status'>('priority');
//Storing sorting preference with Type restricted priotity or status, default priority
const [newTaskTitle, setNewTaskTitle] = useState(''); // for stroing local state

  const handleAddTask = () => {
    console.log('Add task clicked:', newTaskTitle);
    setNewTaskTitle('');
  };

  const handleDelete = (taskId: string) => {
    console.log('Delete task:', taskId);
  };
    }