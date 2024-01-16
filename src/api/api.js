import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;