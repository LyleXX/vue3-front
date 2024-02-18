import axios from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
});

service.interceptors.request.use((config) => {
  config.headers.icode = '16841EF82EA8BFD5';
  return config;
});

service.interceptors.response.use((response) => {
  const { success, data, message } = response.data;
  if (success) {
    return data;
  } else {
    return Promise.reject(new Error(message));
  }
});

export default service;
