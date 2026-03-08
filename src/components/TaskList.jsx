import React, { useState } from 'react';

function TaskList({ tasks, onDelete, onStatusChange, onUpdateTask }) {
  
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', dueDate: '' });

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    const options = { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditData({ title: task.title, description: task.description, dueDate: task.dueDate || '' });
  };

  const handleSave = async (id) => {
    await onUpdateTask(id, editData);
    setEditingId(null);
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b' }}>
          No tasks found. Add your first task above!
        </p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="task-card">
            {editingId === task.id ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                  value={editData.title} 
                  onChange={(e) => setEditData({...editData, title: e.target.value})} 
                />
                <textarea 
                  value={editData.description} 
                  onChange={(e) => setEditData({...editData, description: e.target.value})} 
                />
                <input 
                  type="datetime-local"
                  value={editData.dueDate}
                  onChange={(e) => setEditData({...editData, dueDate: e.target.value})} 
                />
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button onClick={() => handleSave(task.id)} style={{ backgroundColor: '#22c55e', color: 'white' }}>Save</button>
                  <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#cbd5e1' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                    
                    <div className="task-date">
                      📅 Due: {formatDate(task.dueDate)}
                    </div>
                  </div>
                  
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    backgroundColor: task.status === 'DONE' ? '#dcfce7' : '#fef9c3',
                    color: task.status === 'DONE' ? '#166534' : '#854d0e'
                  }}>
                    {task.status}
                  </span>
                </div>

                <div className="task-footer">
                  <select 
                    value={task.status} 
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    style={{ width: 'auto', marginBottom: 0, padding: '5px' }}
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => startEdit(task)} style={{ backgroundColor: '#e2e8f0' }}>Edit</button>
                    
                    <button 
                      className="btn-delete"
                      onClick={() => {
                        if(window.confirm("Are you sure you want to delete this task?")) {
                          onDelete(task.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;