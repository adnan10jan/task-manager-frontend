import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    // ✅ Normalize roles safely
    const roles =
      decoded.roles?.map((r) => r.name || r) ?? [];

    return {
      username: decoded.sub,
      roles,
    };
  } catch (e) {
    console.error("JWT decode failed", e);
    return null;
  }
};
