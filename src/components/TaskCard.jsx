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
        title: task.title,
        description: task.description,
        status: newStatus,
        priority: task.priority,
      });

      // backend may return wrapped response
      const updatedTask = res.data.data || res.data;
      onUpdated(updatedTask);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm mb-3">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-sm">
          Status: <b>{task.status}</b> | Priority: <b>{task.priority}</b>
        </span>

        <div className="flex gap-2">
          <button
            onClick={toggle}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Toggle
          </button>

          <button
            onClick={del}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
