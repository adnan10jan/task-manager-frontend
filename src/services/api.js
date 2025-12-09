// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

import axios from "axios";

const USE_MOCK = true; // <🔥 turn ON mocks here

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

// ----------------------
// MOCK IMPLEMENTATION
// ----------------------
if (USE_MOCK) {
  console.log("%cMock API Enabled", "color: purple; font-weight: bold");

  const mockDB = {
    users: [],
    tasks: [
      { id: 1, title: "Mock Task 1", description: "First demo task", status: "TODO", priority: "MEDIUM" },
      { id: 2, title: "Mock Task 2", description: "Second task", status: "DONE", priority: "LOW" },
    ],
    currentUser: null,
  };

  api.interceptors.request.use(async (config) => {
    const { url, method, data } = config;

    // simulate network latency
    await new Promise((res) => setTimeout(res, 300));

    // SIGNUP
    if (url.endsWith("/auth/signup") && method === "post") {
      const body = JSON.parse(data);
      mockDB.users.push({
        username: body.username,
        email: body.email,
        password: body.password,
      });
      return Promise.reject({
        __mock: true,
        data: { message: "Signup successful" },
      });
    }

    // LOGIN
    if (url.endsWith("/auth/login") && method === "post") {
      const body = JSON.parse(data);
      const user = mockDB.users.find(
        (u) => u.username === body.username && u.password === body.password
      );

      if (!user) {
        return Promise.reject({
          __mock: true,
          data: { message: "Invalid username or password" },
        });
      }

      mockDB.currentUser = user;

      return Promise.reject({
        __mock: true,
        data: { token: "mock-jwt-token", username: user.username },
      });
    }

    // GET TASKS
    if (url.endsWith("/tasks") && method === "get") {
      return Promise.reject({
        __mock: true,
        data: mockDB.tasks,
      });
    }

    // CREATE TASK
    if (url.endsWith("/tasks") && method === "post") {
      const body = JSON.parse(data);
      const newTask = {
        id: Date.now(),
        title: body.title,
        description: body.description,
        priority: body.priority || "MEDIUM",
        status: "TODO",
      };
      mockDB.tasks.push(newTask);

      return Promise.reject({
        __mock: true,
        data: newTask,
      });
    }

    // UPDATE TASK
    if (url.startsWith("/tasks/") && method === "put") {
      const id = parseInt(url.split("/").pop());
      const updates = JSON.parse(data);

      const task = mockDB.tasks.find((t) => t.id === id);
      Object.assign(task, updates);

      return Promise.reject({
        __mock: true,
        data: task,
      });
    }

    // DELETE TASK
    if (url.startsWith("/tasks/") && method === "delete") {
      const id = parseInt(url.split("/").pop());
      mockDB.tasks = mockDB.tasks.filter((t) => t.id !== id);

      return Promise.reject({
        __mock: true,
        data: { message: "Task deleted" },
      });
    }

    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.__mock) {
        return Promise.resolve({ data: err.data });
      }
      return Promise.reject(err);
    }
  );
}

export default api;

