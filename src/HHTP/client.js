import axios from "axios";
import Message from "../utils/Message";


export const API_URL = "http://192.168.1.123:8080/api";
// export const API_URL = "http://localhost:8080/api";

const client = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

client.interceptors.request.use((config) => {
  if (config.headers === undefined) {
    config.headers = {}
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  return config;
})
client.interceptors.response.use((config) => {
  return config;
}, (error) => {
  if (error?.response?.status === 401) {
    Message.unauthorizedError();
    localStorage.removeItem("token");
    return Promise.reject(error);
  }
  return Promise.reject(error);
})

export default client;
