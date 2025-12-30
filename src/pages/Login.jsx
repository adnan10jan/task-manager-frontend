import authApi from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await authApi.post("/auth/login", {
        username,
        password,
      });

      const token = res.data.data.accessToken;
      const refresh = res.data.data.refreshToken;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refresh);

      navigate("/tasks");
    } catch (err) {
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
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
