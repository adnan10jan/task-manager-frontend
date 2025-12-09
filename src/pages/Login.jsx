import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { saveToken, saveUsername } from "../services/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      const { token, username: name } = res.data;
      saveToken(token);
      saveUsername(name || username);
      nav("/tasks");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="form" onSubmit={submit}>
        <input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
