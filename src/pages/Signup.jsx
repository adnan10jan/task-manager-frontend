import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
  e.preventDefault();
  await new Promise(r => setTimeout(r, 300)); // simulate latency
  alert('Registered successfully (mock)');
  nav('/login');
};


  return (
    <div>
      <h2>Signup</h2>
      <form className="form" onSubmit={submit}>
        <input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button className="button" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
