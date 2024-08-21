import axios from "axios";

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
