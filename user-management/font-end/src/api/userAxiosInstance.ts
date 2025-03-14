import axios from "axios";

export const userAxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

userAxiosInstance.interceptors.request.use(async (config) => {
  const tokenString = localStorage.getItem("userAccessToken");

  let access_token = null;
  try {
    access_token = tokenString ? JSON.parse(tokenString) : null;
  } catch (error) {
    console.error("Error parsing access token:", error);
  }

  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }

  return config;
});

userAxiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.userAccessToken) {
      localStorage.setItem(
        "userAccessToken",
        JSON.stringify(response.data.userAccessToken)
      );
      console.log("Access token set in local storage");
    }
    return response;
  },
  async (error) => {
        const original_request = error.config;

    if (
      error.response?.status === 403 &&
      error.response.data.message ===
        "Refresh token expired, please log in again." &&
      !original_request._retry
    ) {
      // Clear the local storage or cookies where tokens are stored
      localStorage.removeItem("userAccessToken");
      localStorage.removeItem("user");
      

      // Redirect the user to the login page
      window.location.href = "/login";

      return Promise.reject(error);
    }
    return Promise.reject(error)
  }
);
