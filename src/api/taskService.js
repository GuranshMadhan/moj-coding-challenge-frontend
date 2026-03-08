import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/tasks";

export const taskService = {
    getAllTasks: () => axios.get(API_BASE_URL),
    createTask: (taskData) => axios.post(API_BASE_URL, taskData),
    updateStatus: (id, status) => axios.patch(`${API_BASE_URL}/${id}/status?status=${status}`),
    deleteTask: (id) => axios.delete(`${API_BASE_URL}/${id}`)
};