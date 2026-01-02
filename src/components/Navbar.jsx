import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between">
      <h1 className="text-indigo-600 font-bold text-lg">
        Task Manager
      </h1>

      <div className="flex gap-4 items-center">
        {isAdmin && (
          <Link
            to="/admin"
            className="text-sm text-indigo-600 font-medium"
          >
            Admin
          </Link>
        )}

        <span className="text-sm text-gray-600">
          {user?.username}
        </span>

        <button
          onClick={logout}
          className="text-red-500 text-sm hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
