import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  const makeAdmin = (id) => {
    api.put(`/admin/users/${id}/role?role=ROLE_ADMIN`)
      .then(() => alert("Role updated"));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      {users.map(u => (
        <div key={u.id} className="border p-3 mb-2 flex justify-between">
          <div>
            <b>{u.username}</b>
            <p className="text-sm">{u.roles.join(", ")}</p>
          </div>
          <button
            onClick={() => makeAdmin(u.id)}
            className="bg-indigo-500 text-white px-3 rounded"
          >
            Make Admin
          </button>
        </div>
      ))}
    </div>
  );
}
