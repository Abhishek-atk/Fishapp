import apiClient from "./apiClient";

const loginWithFirebase = async (idToken) => {
  return apiClient("/auth/login", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

const getCurrentUser = async (idToken) => {
  return apiClient("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

export { loginWithFirebase, getCurrentUser };
