import api from "./api";

/**
 * Signup new user
 */
export const signup = (data) => {
  return api.post("/auth/signup", data);
};

/**
 * Login user
 * Stores tokens safely
 */
export const login = async (data) => {
  const res = await api.post("/auth/login", data);

  // Backend returns wrapped response
  const payload = res.data.data || res.data;

  localStorage.setItem("accessToken", payload.accessToken);
  localStorage.setItem("refreshToken", payload.refreshToken);

  return payload;
};

/**
 * Logout user (safe logout)
 */
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (err) {
    // Ignore backend error
  } finally {
    localStorage.clear();
    window.location.href = "/login";
  }
};

/**
 * Refresh access token
 */
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");

  if (!refresh) {
    throw new Error("No refresh token");
  }

  const res = await api.post("/auth/refresh", {
    refreshToken: refresh,
  });

  const newAccessToken = res.data.accessToken;

  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
};
