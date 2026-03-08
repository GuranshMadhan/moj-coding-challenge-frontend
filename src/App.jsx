import React, { useEffect, useState } from 'react';
import { taskService } from './api/taskService';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    await taskService.deleteTask(id);
    loadTasks();
  };

  const handleStatusChange = async (id, newStatus) => {
    await taskService.updateStatus(id, newStatus);
    loadTasks();
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={loadTasks} />
      
      {loading ? <p>Loading tasks...</p> : (
        <TaskList 
          tasks={tasks} 
          onDelete={handleDelete} 
          onStatusChange={handleStatusChange} 
        />
      )}
    </div>
  );
}

export default App;