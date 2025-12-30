import { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then((res) => {
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setTasks(data);
    });
  }, []);

  const onCreated = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const onDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const onUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  return (
    <div>
      <h2>Your Tasks</h2>

      <TaskForm onCreated={onCreated} />

      {tasks.length === 0 && <p>No tasks found</p>}

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleted={onDeleted}
          onUpdated={onUpdated}
        />
      ))}
    </div>
  );
}
