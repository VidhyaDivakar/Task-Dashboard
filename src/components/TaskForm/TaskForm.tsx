import { useState } from 'react';
//Importing the props from the parent
import type {
    TaskFormProps,
    TaskFormData,
    TaskStatus,
    TaskPriority
} from '../../types';

export const TaskForm: React.FC<TaskFormProps> = ({
    onSubmit,
    initialData
}) => {
    //Using hooks for the form state
    const [formData, setFormData] = useState<TaskFormData>(
        initialData || {
            title: '',
            description: '',
            status: 'pending',
            priority: 'medium',
            dueDate: ''
        }
    );
}

// Declaring the validation errors
const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});


// Function to handles input and the change made
const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
    const { name, value } = e.target;

    //Update form state by merging previous values and dynamically setting the changed field
    // Clear the error for that specific field as the user starts typing   
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));

    // Clear error when user types
    setErrors(prev => ({
        ...prev,
        [name]: ''
    }));
};

//Adding the validation logic
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

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    onsubmit(formData);

    if (!intialData) {
        setFormData({
            title: '',
            description: '',
            status: 'pending',
            priority: 'medium',
            dueDate: ''
        });
    }
};
return (
    <form onSubmit={handleSubmit}>
        <h2>{initialData ? 'Edit Task' : 'Add Task'}</h2>
        {/*Adding title of the form */}
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
 {/*Adding description of the form */}
 <div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
    </form>
)