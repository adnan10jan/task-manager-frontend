// import { useState } from "react";
// import api from "../services/api";

// export default function TaskForm({ onCreated }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("MEDIUM");

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/tasks", { title, description, priority });
//       const task = res.data.data || res.data;
//       onCreated(task);

//       setTitle("");
//       setDescription("");
//       setPriority("MEDIUM");
//     } catch {
//       alert("Create failed");
//     }
//   };

//   return (
//     <form onSubmit={submit} className="flex flex-col md:flex-row gap-2 mb-4">
//       <input
//         className="flex-1 border rounded-lg px-3 py-2"
//         placeholder="Title"
//         required
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <input
//         className="flex-1 border rounded-lg px-3 py-2"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <select
//         className="border rounded-lg px-3 py-2"
//         value={priority}
//         onChange={(e) => setPriority(e.target.value)}
//       >
//         <option>LOW</option>
//         <option>MEDIUM</option>
//         <option>HIGH</option>
//       </select>

//       <button className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700">
//         Add Task
//       </button>
//     </form>
//   );
// }


import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/tasks", {
        title,
        description,
        priority,
      });

      const task = res.data.data || res.data;
      onCreated(task);

      toast.success("Task created successfully 🎉");

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
    } catch (err) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col md:flex-row gap-2 mb-4">
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

      <button
        disabled={loading}
        className={`px-4 rounded-lg text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
