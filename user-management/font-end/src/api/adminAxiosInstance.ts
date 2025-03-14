import axios from "axios";


export const adminAxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});



adminAxiosInstance.interceptors.request.use(async (config) => {
  const tokenString = localStorage.getItem("adminAccessToken");

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



adminAxiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.adminAccessToken) {
      localStorage.setItem(
        "adminAccessToken",
        JSON.stringify(response.data.adminAccessToken)
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
    
      localStorage.removeItem("adminAccessToken");
      localStorage.removeItem("user");

      
      window.location.href = "/login";

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
