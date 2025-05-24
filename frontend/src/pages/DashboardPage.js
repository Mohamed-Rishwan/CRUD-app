import React, { useEffect, useState } from 'react';
import { createNote, getNotes, updateNote, deleteNote } from '../services/api';

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', id: null });
  const token = localStorage.getItem('token');

  const loadNotes = async () => {
    const res = await getNotes(token);
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) await updateNote(form.id, form, token);
    else await createNote(form, token);
    setForm({ title: '', description: '', id: null });
    loadNotes();
  };

  const handleEdit = (note) => setForm({ title: note.title, description: note.description, id: note._id });

  const handleDelete = async (id) => {
    await deleteNote(id, token);
    loadNotes();
  };

  useEffect(() => { loadNotes(); }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /><br />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea><br />
        <button type="submit">{form.id ? 'Update' : 'Add'} Note</button>
      </form>
      <hr />
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <h4>{note.title}</h4>
            <p>{note.description}</p>
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
