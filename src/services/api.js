import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// =====================
// REQUEST INTERCEPTOR
// =====================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =====================
// RESPONSE INTERCEPTOR
// =====================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🚫 If no response or already retried → reject
    if (!error.response || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 🔁 Handle token expiry
    if (error.response.status === 403) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const res = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          { refreshToken }
        );

        // ✅ Handle both response formats
        const newToken =
          res.data.accessToken || res.data.data?.accessToken;

        if (!newToken) {
          throw new Error("Invalid refresh response");
        }

        localStorage.setItem("accessToken", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("REFRESH FAILED → LOGOUT");

        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
