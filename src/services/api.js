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

    if (!token || role !== "admin") {
      console.error("Unauthorized: Only admins can upload media.");
      throw new Error("Unauthorized access.");
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
    console.error("Error uploading media:", error);
    throw error;
  }
};

