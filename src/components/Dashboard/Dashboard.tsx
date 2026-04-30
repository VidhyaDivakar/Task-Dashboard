// Dashboard component that manages tasks, filters, statistics, and composes all task-related UI components into a unified layout

import React, { useState } from 'react';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskList } from '../TaskList/TaskList';
import { TaskFilter } from '../TaskFilter/TaskFilter';

import type {
  Task,
  TaskFormData,
  TaskStatus,
  TaskFilterOptions
} from '../../types';

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilterOptions>({
    status: 'all',
    priority: 'all',
    searchQuery: ''
  });

  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

   const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

   const filteredTasks = tasks.filter(task => {
    return (
      (filters.status === 'all' || task.status === filters.status) &&
      (filters.priority === 'all' || task.priority === filters.priority) &&
      task.title.toLowerCase().includes(filters.searchQuery?.toLowerCase() || '')
    );
  });
  