import React, { useState } from "react";
import api from "../services/api";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/tasks", { title, description, priority });
      const task = res.data.data || res.data;
      onCreated(task);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
    } catch (err) {
      alert("Create failed");
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-2 mb-4">
      <input
        className="flex-1 border rounded-lg px-3 py-2"
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="flex-1 border rounded-lg px-3 py-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="border rounded-lg px-3 py-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>LOW</option>
        <option>MEDIUM</option>
        <option>HIGH</option>
      </select>

      <button className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700">
        Add
      </button>
    </form>
  );
}
