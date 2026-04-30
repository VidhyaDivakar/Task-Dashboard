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
        <form onSubmit={handleSubmit}>
            <h2>{initialData ? 'Edit Task' : 'Add Task'}</h2>

            {/* Adding title of the form */}
            <div>
                <input
                    type="text"
                    name="title"
                    placeholder="Task title"
                    value={formData.title}
                    onChange={handleChange}
                />
                {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
            </div>

            {/* Adding description of the form */}
            <div>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            {/* Adding status of the task */}
            <div>
                <label>Status:</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Adding priority field of the form */}
            <div>
                <label>Priority:</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Adding due date field of the form */}
            <div>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate || ''}
                    onChange={handleChange}
                />
                {errors.dueDate && <p style={{ color: 'red' }}>{errors.dueDate}</p>}
            </div>

            {/* Adding submit field of the form */}
            <button type="submit">
                {initialData ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};