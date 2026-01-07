import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api",
// });

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


/* =====================
   REQUEST INTERCEPTOR
===================== */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  // 🚫 DO NOT attach token to auth endpoints
  if (token && !config.url.includes("/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =====================
   RESPONSE INTERCEPTOR
===================== */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ❌ No response OR already retried
    if (!error.response || originalRequest._retry) {
      return Promise.reject(error);
    }

    // ❌ Never refresh for auth endpoints
    if (originalRequest.url.includes("/auth")) {
      return Promise.reject(error);
    }

    // 🔁 Token expired
    if (error.response.status === 403) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          { refreshToken }
        );

        const newToken = res.data?.data?.accessToken;
        if (!newToken) throw new Error("Invalid refresh response");

        localStorage.setItem("accessToken", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
