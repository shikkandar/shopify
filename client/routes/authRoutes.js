import axios from "axios";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export async function registerUser(credentials) {
  try {
    const res = await axios.post("/auth/register", credentials);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
export async function loginUser(credentials) {
  try {
    const res = await axios.post("/auth/login", credentials);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export async function getUsers(id) {
  try {
    const res = await axios.get(`/auth/user/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
