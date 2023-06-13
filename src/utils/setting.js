import axios from "axios";
import {TOKEN_CYBERSOFT, DOMAIN} from "./config"


export const setStore = (name, values) => {
  localStorage.setItem(name, values);
};

export const getStore = (name) => {
  return localStorage.getItem(name);
};

export const setStoreJSON = (name, values) => {
  const serializedValues = JSON.stringify(values);
  localStorage.setItem(name, serializedValues);
};

export const getStoreJSON = (name) => {
  const value = localStorage.getItem(name);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const clearLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const ACCESS_TOKEN = 'accessToken';
export const USER_LOGIN = 'userLogin';
export const CURRENT_USER = "currentUser";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 2000,
});

http.interceptors.request.use((config) => {
  const token = getStore(ACCESS_TOKEN);
  if (config.headers) {
    config.headers = {
      ...config.headers,
      'Token': token,
      'TokenCybersoft': TOKEN_CYBERSOFT,
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log(error.response.status);
  if (error.response.status === 400 || error.response.status === 404) {
    return Promise.reject(error);
  }
  if (error.response.status === 401 || error.response.status === 403) {
    alert('Token Không hợp lệ! Vui lòng đăng nhập lại');
    return Promise.reject(error);
  }
});
