import type { FormStatusNotPending } from "react-dom";

// Declaring the TaskStatus, TaskPriority as type with strict string values
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string; // ISO format (YYYY-MM-DD)
    createdAt: string;
    updatedAt?: string;
}

export interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete?: (taskId: string) => void;
}

export interface TaskListProps {
    tasks: Task [];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}
// onStatusChange this function is used to update each task's status, 
// this function has a strict input
export interface TaskFormData {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}

export interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  initialData?: TaskFormData;
}

export interface TaskFilterOptions {
  status?: TaskStatus | 'all';
  priority?: TaskPriority | 'all';
  searchQuery?: string;
}

export interface TaskFilterProps {
  filters: TaskFilterOptions;
  onFilterChange: (filters: TaskFilterOptions) => void;
}