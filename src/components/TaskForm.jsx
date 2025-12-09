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
      onCreated(res.data);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
    } catch (err) {
      alert("Create failed");
    }
  };

  return (
    <form className="form" onSubmit={submit} style={{ marginBottom: 12 }}>
      <input
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        required
      />
      <input
        className="input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
      />
      <select
        className="input"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
      <button className="button" type="submit">
        Create Task
      </button>
    </form>
  );
}
