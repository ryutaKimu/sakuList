import axios from "axios";

export const adminApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    
  },
  withXSRFToken: true,
})