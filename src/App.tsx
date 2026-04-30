import { useState } from 'react'
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
//import { TaskFilter } from './components/TaskFilter/TaskFilter';

import './App.css'
import type {
  Task,
  TaskFormData,
  TaskStatus,
  TaskFilterOptions
} from './types';
//// Initializing tasks state as an empty array to store the list of tasks
// Initializing filter state to manage task filtering by status, priority, and search query

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilterOptions>({
    status: 'all',
    priority: 'all',
    searchQuery: ''
  });

  // // Creating a new task with a unique ID and timestamp by combining form data
// Updating tasks state by appending the new task to the existing list
    const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };
     setTasks(prev => [...prev, newTask]);
  };

  //updating status
    const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // Adding logic to filter the tasks
   const filteredTasks = tasks.filter(task => {
    const matchesStatus =
      filters.status === 'all' || task.status === filters.status;

    const matchesPriority =
      filters.priority === 'all' || task.priority === filters.priority;

    const matchesSearch =
      task.title.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '');

    return matchesStatus && matchesPriority && matchesSearch;
  });

 return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>

      {/* ➤ Form */}
      <TaskForm onSubmit={handleAddTask} />

      {/* ➤ Filter 
      <TaskFilter
        filters={filters}
        onFilterChange={setFilters}
      />*/}

      {/* ➤ List */}
      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default App;
