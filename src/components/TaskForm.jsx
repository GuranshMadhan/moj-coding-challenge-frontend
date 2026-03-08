import React, { useState } from 'react';
import { taskService } from '../api/taskService';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Title is required");

    await taskService.createTask({ title, description, dueDate: dueDate ? dueDate : null });
    setTitle('');
    setDescription('');
    setDueDate('');
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input 
        type="text" 
        placeholder="Task Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Description (Optional)" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <input 
        type="datetime-local" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
      />
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;