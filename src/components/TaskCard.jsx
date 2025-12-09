import React from "react";
import api from "../services/api";

export default function TaskCard({ task, onDeleted, onUpdated }) {
  const del = async () => {
    if (!confirm("Delete task?")) return;
    try {
      await api.delete(`/tasks/${task.id}`);
      onDeleted(task.id);
    } catch (err) {
      alert("Delete failed");
    }
  };

  const toggle = async () => {
    try {
      const newStatus = task.status === "DONE" ? "TODO" : "DONE";
      const res = await api.put(`/tasks/${task.id}`, {
        ...task,
        status: newStatus,
      });
      onUpdated(res.data);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>
        Status: {task.status} | Priority: {task.priority}
      </p>
      <div>
        <button onClick={toggle} className="button">
          Toggle Done
        </button>
        <button onClick={del} className="button">
          Delete
        </button>
      </div>
    </div>
  );
}
