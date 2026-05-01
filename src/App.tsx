import { useState } from 'react'
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { TaskFilter } from './components/TaskFilter/TaskFilter';

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

  // delete a task from the list
  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
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
    <div className="min-h-screen bg-slate-50 p-5 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-3xl font-semibold text-slate-900">Task Manager</h1>

        <TaskForm onSubmit={handleAddTask} />

        <TaskFilter
          filters={filters}
          onFilterChange={setFilters}
        />

        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default App;
