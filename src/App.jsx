import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getUsername } from "./services/auth";

export default function App() {
  const nav = useNavigate();
  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
        <nav>
          {isLoggedIn() ? (
            <>
              <span className="user">{getUsername()}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
