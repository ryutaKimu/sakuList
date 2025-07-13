import axios from "axios";

export const adminApi = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
  },
})