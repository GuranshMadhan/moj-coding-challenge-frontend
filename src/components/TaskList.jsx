import React from 'react';

function TaskList({ tasks, onDelete, onStatusChange }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? <p style={{textAlign: 'center'}}>No tasks found.</p> : (
        tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            
            <div className="task-footer">
              <select 
                value={task.status} 
                onChange={(e) => onStatusChange(task.id, e.target.value)}
                style={{ width: 'auto', marginBottom: 0 }}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>

              <button 
                className="btn-delete"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;