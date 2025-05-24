import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

export const getNotes = (token) => API.get('/notes', { headers: { Authorization: token } });
export const createNote = (data, token) => API.post('/notes', data, { headers: { Authorization: token } });
export const updateNote = (id, data, token) => API.put(`/notes/${id}`, data, { headers: { Authorization: token } });
export const deleteNote = (id, token) => API.delete(`/notes/${id}`, { headers: { Authorization: token } });
