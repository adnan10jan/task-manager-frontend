import { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Layout from "../components/Layout";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   api.get("/tasks").then((res) => {
  //     const data = Array.isArray(res.data)
  //       ? res.data
  //       : res.data.data || [];
  //     setTasks(data);
  //   });
  // }, []);

  useEffect(() => {
  api.get("/tasks")
    .then((res) => {
      const data = res.data.data || res.data;
      setTasks(data);
    })
    .catch(() => toast.error("Failed to load tasks"))
    .finally(() => setLoading(false));
}, []);


  const onCreated = (task) => {
    setTasks((prev) => [task, ...prev]);
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
    <>
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      <TaskForm onCreated={onCreated} />

      {tasks.length === 0 && (
        <p className="text-gray-500 mt-4">No tasks found</p>
      )}

      {loading && <p className="text-gray-500">Loading tasks...</p>}


      <div className="grid gap-4 mt-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDeleted={onDeleted}
            onUpdated={onUpdated}
          />
        ))}
      </div>
    </>
  );
}
