import { useState, type ChangeEvent, type FormEvent, type FC } from 'react';
//Importing the props from the parent
import type {
    TaskFormProps,
    TaskFormData
} from '../../types';

// Default values for the task form
const defaultFormData: TaskFormData = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
};

export const TaskForm: FC<TaskFormProps> = ({
    onSubmit,
    initialData
}) => {
    // Using hooks for the form state
    const [formData, setFormData] = useState<TaskFormData>(
        initialData || defaultFormData
    );

    // Declaring the validation errors
    const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

    // Function to handles input and the change made
    // Function to handle input changes and update form state
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        // Update form state by merging previous values and changing the targeted field
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear field-specific error when the user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    // Adding the validation logic
    const validate = () => {
        const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (formData.title.length > 100) {
            newErrors.title = 'Title must be under 100 characters';
        }

        if (formData.dueDate) {
            const today = new Date().toISOString().split('T')[0];
            if (formData.dueDate < today) {
                newErrors.dueDate = 'Due date cannot be in the past';
            }
        }

        return newErrors;
    };

    // Submit Handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(formData);

        if (!initialData) {
            setFormData(defaultFormData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{initialData ? 'Edit Task' : 'Add Task'}</h2>

            <div className="space-y-2">
                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                {errors.title && <p className="text-sm text-rose-600">{errors.title}</p>}
            </div>

            <div className="space-y-2">
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full min-h-[120px] rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate || ''}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                {errors.dueDate && <p className="text-sm text-rose-600">{errors.dueDate}</p>}
            </div>

            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
            >
                {initialData ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};