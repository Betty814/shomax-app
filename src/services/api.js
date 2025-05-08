import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const fetchMedias = async (query = "") => {
  try {
    const response = await axios.get(`${API_BASE_URL}/medias`, {
      params: { search: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const fetchMedia = async (id) => {
  if (!id || typeof id !== "string") {
    return null;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/media/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching media:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const submitComment = async (commentData, currentPath) => {
  try {
    const token = localStorage.getItem("token");

    if (isTokenExpired(token)) {
      localStorage.removeItem("token"); // Remove the expired token
      window.location.href = `/login?redirect=${encodeURIComponent(
        currentPath
      )}`; // Redirect to login page with current path
      return;
    }
    const response = await axios.post(`${API_BASE_URL}/comment`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};

export const submitRating = async (ratingData, currentPath) => {
  try {
    const token = localStorage.getItem("token");

    if (isTokenExpired(token)) {
      localStorage.removeItem("token"); // Remove the expired token
      window.location.href = `/login?redirect=${encodeURIComponent(
        currentPath
      )}`; // Redirect to login page with current path
      return;
    }

    const response = await axios.post(`${API_BASE_URL}/rate`, ratingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
};

export const uploadMedia = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      throw new Error("Please log in to upload media");
    }

    if (role !== "admin") {
      throw new Error("Only administrators can upload media");
    }

    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      throw new Error("Your session has expired. Please log in again");
    }

    const response = await axios.post(
      `${API_BASE_URL}/admin/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (error.response.status) {
        case 401:
          throw new Error("Your session has expired. Please log in again");
        case 403:
          throw new Error("You don't have permission to upload media");
        case 413:
          throw new Error("File size too large");
        default:
          throw new Error(
            error.response.data?.message || "Error uploading media"
          );
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server. Please check your connection");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
};
