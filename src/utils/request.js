import axios from 'axios';
import store from '@/store/index.js';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
});

service.interceptors.request.use(
  (config) => {
    config.headers.icode = '16841EF82EA8BFD5';
    if (store.getters.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (error) => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // TODO: token超时
      store.dispatch('user/logout');
    }
    // TODO: 提示错误消息
    return Promise.reject(error);
  }
);

service.interceptors.response.use((response) => {
  const { success, data, message } = response.data;
  if (success) {
    return data;
  } else {
    return Promise.reject(new Error(message));
  }
});

export default service;
