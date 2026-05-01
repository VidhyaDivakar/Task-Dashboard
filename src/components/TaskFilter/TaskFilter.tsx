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
        <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Filters</h3>
            <div className="grid gap-4 sm:grid-cols-3">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={filters.searchQuery || ''}
                    onChange={(e) =>
                        handleChange('searchQuery', e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                <select
                    value={filters.status || 'all'}
                    onChange={(e) =>
                        handleChange('status', e.target.value as TaskFilterOptions['status'])
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                    <option value="all">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div className="mt-4 text-sm text-slate-600">
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