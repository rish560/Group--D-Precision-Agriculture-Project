import axios from 'axios';

<<<<<<< HEAD
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085/api';
=======
const baseURL = import.meta.env.VITE_API_BASE_URL || '';
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
<<<<<<< HEAD
    if (!config.headers.Authorization && typeof window !== 'undefined') {
      const stored = localStorage.getItem('farmverse-auth');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?.token) {
            config.headers.Authorization = `Bearer ${parsed.token}`;
          }
        } catch {}
      }
    }
    // If URL starts with /api and baseURL already ends with /api, strip duplicate leading /api
    if (config.url && config.url.startsWith('/api/') && (config.baseURL || axiosInstance.defaults.baseURL).endsWith('/api')) {
      config.url = config.url.replace(/^\/api/, '');
    }
=======
    if (import.meta.env.VITE_API_BASE_URL) {
      if (config.url && !config.url.startsWith('/api') && !config.url.startsWith('http')) {
        config.url = `/api${config.url}`;
      }
    }
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
