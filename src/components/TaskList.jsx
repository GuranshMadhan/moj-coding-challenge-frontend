import React from 'react';

function TaskList({ tasks, onDelete, onStatusChange }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? <p>No tasks found. Add one above!</p> : (
        tasks.map(task => (
          <div key={task.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: <strong>{task.status}</strong></p>
            
            <select 
              value={task.status} 
              onChange={(e) => onStatusChange(task.id, e.target.value)}
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>

            <button 
              onClick={() => onDelete(task.id)} 
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;