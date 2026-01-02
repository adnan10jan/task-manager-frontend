import authApi from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥 IMPORTANT

  const handleLogin = async () => {
    try {
      const res = await authApi.post("/auth/login", {
        username,
        password,
      });

      const data = res.data.data;

      // ✅ SINGLE SOURCE OF TRUTH
      login({
        username: data.username,
        roles: data.roles,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      navigate("/tasks");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full border rounded-lg px-3 py-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Login
      </button>

      {/* ✅ SIGNUP LINK (RESTORED) */}
      <p className="text-center text-sm text-gray-600 mt-4">
        New user?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-indigo-600 font-medium cursor-pointer hover:underline"
        >
          Create account
        </span>
      </p>
    </div>
  );
}

export default Login;
