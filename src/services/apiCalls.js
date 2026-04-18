import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINTS } from "./endpoints";

const BASE_URL =
  import.meta.env.VITE_APP_BASE_URL ||
  "http://api.roadozcourier.com/api/v1";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized session. Clearing credentials and redirecting...");
            Cookies.remove("access_token");
      window.location.href = "/login";
    }
        return Promise.reject(error);
  }
);



export const loginApi = async (data) => {
  const res = await API.post(ENDPOINTS.LOGIN, data);
  return res.data;
};


export const getProfileApi = async () => {
  const res = await API.get(ENDPOINTS.PROFILE);
  return res.data;
};


export const getProfileImageApi = async () => {
  const res = await API.get(ENDPOINTS.PROFILE_IMAGE);
  return res.data;
};


export const updateProfileApi = async (data) => {
  const res = await API.put(ENDPOINTS.PROFILE, data);
  return res.data;
};


export const uploadProfileImageApi = async (formData) => {
  const res = await API.post(ENDPOINTS.UPLOAD_IMAGE, formData, {
    headers: { 
      "Content-Type": "multipart/form-data" 
    },
  });
  return res.data;
};