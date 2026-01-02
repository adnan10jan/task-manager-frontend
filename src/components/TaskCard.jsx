// import api from "../services/api";

// export default function TaskCard({ task, onDeleted, onUpdated }) {
//   const del = async () => {
//     if (!confirm("Delete task?")) return;
//     try {
//       await api.delete(`/tasks/${task.id}`);
//       onDeleted(task.id);
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   const toggle = async () => {
//     try {
//       const newStatus = task.status === "DONE" ? "TODO" : "DONE";

//       const res = await api.put(`/tasks/${task.id}`, {
//         title: task.title,
//         description: task.description,
//         status: newStatus,
//         priority: task.priority,
//       });

//       const updatedTask = res.data.data || res.data;
//       onUpdated(updatedTask);
//     } catch {
//       alert("Update failed");
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
//       <h3 className="font-semibold text-lg">{task.title}</h3>

//       <p className="text-sm text-gray-600 mt-1">
//         {task.description || "No description"}
//       </p>

//       <div className="flex justify-between items-center mt-3">
//         <span
//           className={`px-2 py-1 text-xs rounded-full ${
//             task.status === "DONE"
//               ? "bg-green-100 text-green-700"
//               : "bg-yellow-100 text-yellow-700"
//           }`}
//         >
//           {task.status}
//         </span>

//         <span className="text-xs text-gray-500">
//           Priority: {task.priority}
//         </span>
//       </div>

//       <div className="flex gap-2 mt-4">
//         <button
//           className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-1 rounded"
//           onClick={toggle}
//         >
//           Toggle
//         </button>

//         <button
//           className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded"
//           onClick={del}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }



import api from "../services/api";
import toast from "react-hot-toast";

export default function TaskCard({ task, onDeleted, onUpdated }) {
  const del = async () => {
    if (!confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${task.id}`);
      onDeleted(task.id);
      toast.success("Task deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggle = async () => {
    try {
      const newStatus = task.status === "DONE" ? "TODO" : "DONE";

      const res = await api.put(`/tasks/${task.id}`, {
        ...task,
        status: newStatus,
      });

      onUpdated(res.data.data || res.data);
      toast.success("Task updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description || "No description"}</p>

      <div className="flex justify-between mt-3">
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {task.status}
        </span>
        <span className="text-xs text-gray-500">
          Priority: {task.priority}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={toggle}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-1 rounded"
        >
          Toggle
        </button>
        <button
          onClick={del}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

