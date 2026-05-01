// Dashboard component that manages tasks, filters, statistics, and composes all task-related UI components into a unified layout

import React, { useState } from 'react';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskList } from '../TaskList/TaskList';
import { TaskFilter } from '../TaskFilter/TaskFilter';

// // Importing TypeScript types for task structure, form data, status, and filtering options
// Used for type safety and consistency across the Dashboard component logic
import type {
  Task,
  TaskFormData,
  TaskStatus,
  TaskFilterOptions
} from '../../types';

// Using useState to store all tasks in an array and manage updates dynamically
// Also storing filter values (status, priority, search) to control what tasks are displayed
export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilterOptions>({
    status: 'all',
    priority: 'all',
    searchQuery: ''
  });
  // Function to create a new task using form data and add it to the existing tasks list
  // Generates a unique id and timestamp, then updates state without mutating old data
  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };
  // Function to update the status of a specific task based on its id
  // Loops through tasks and only updates the matched task while keeping others unchanged
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (filters.status === 'all' || task.status === filters.status) &&
      (filters.priority === 'all' || task.priority === filters.priority) &&
      task.title.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '')
    );
  });

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;


  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>

      <div>
        <span>Total: {total}</span> |
        <span> Completed: {completed}</span> |
        <span> Pending: {pending}</span>
      </div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

        <div style={{ flex: 1 }}>
          <TaskForm onSubmit={handleAddTask} />
        </div>

        <div style={{ flex: 2 }}>
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
    </div>
  );
};