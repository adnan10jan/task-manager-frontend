import { useEffect, useState } from "react";
import api from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api
      .get("/tasks")
      .then((res) => {
        // ✅ HANDLE BOTH RESPONSE TYPES
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setTasks(data);
      })
      .catch((err) => {
        console.error("TASK FETCH ERROR:", err);
      });
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>

      {tasks.length === 0 && <p>No tasks found</p>}

      {tasks.map((task) => (
        <div key={task.id}>
          <b>{task.title}</b> - {task.status}
        </div>
      ))}
    </div>
  );
}

export default Tasks;
