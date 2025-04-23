import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const signUp = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error during sign-up:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      console.error("Error during sign-up: No response received");
      throw new Error("No response received");
    } else {
      console.error("Error during sign-up:", error.message);
      throw new Error(error.message);
    }
  }
};

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    // set username
    localStorage.setItem("username", user.username);
    // set role
    localStorage.setItem("role", user.role);

    return user;
  } catch (error) {
    if (error.response) {
      console.error("Error during login:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      console.error("Error during login: No response received");
      throw new Error("No response received");
    } else {
      console.error("Error during login:", error.message);
      throw new Error(error.message);
    }
  }
};

