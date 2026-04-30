import React from 'react';
import type {
    TaskFilterProps,
    TaskFilterOptions
} from '../../types';
// Functional component with props
export const TaskFilter: React.FC<TaskFilterProps> = ({
    filters,
    onFilterChange
}) => {
      // Function to handle changes for any filter field
        const handleChange = (
        key: keyof TaskFilterOptions,
        value: TaskFilterOptions[keyof TaskFilterOptions]
    ) => {
        onFilterChange({
            ...filters,
            [key]: value
        });
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <h3>Filters</h3>
            <input
                type="text"
                placeholder="Search tasks..."
                value={filters.searchQuery || ''}
                onChange={(e) =>
                    handleChange('searchQuery', e.target.value)
                }
            />
            <select
                value={filters.status || 'all'}
                onChange={(e) =>
                    handleChange('status', e.target.value as TaskFilterOptions['status'])
                }
            >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <select
                value={filters.priority || 'all'}
                onChange={(e) =>
                    handleChange('priority', e.target.value as TaskFilterOptions['priority'])
                }
            >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <div style={{ marginTop: '10px' }}>
                {filters.status !== 'all' && (
                    <span> Status: {filters.status} </span>
                )}
                {filters.priority !== 'all' && (
                    <span> | Priority: {filters.priority} </span>
                )}
                {filters.searchQuery && (
                    <span> | Search: "{filters.searchQuery}" </span>
                )}
            </div>
        </div>
    );
};