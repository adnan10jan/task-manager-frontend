import React, { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { isLoggedIn } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      nav("/login");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreated = (t) => setTasks((prev) => [t, ...prev]);
  const handleDeleted = (id) =>
    setTasks((prev) => prev.filter((x) => x.id !== id));
  const handleUpdated = (updated) =>
    setTasks((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

  return (
    <div>
      <h2>Your Tasks</h2>
      <TaskForm onCreated={handleCreated} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            tasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onDeleted={handleDeleted}
                onUpdated={handleUpdated}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
