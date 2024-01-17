import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

const username = process.env.VUE_USER ;
const password = process.env.VUE_PASSWORD;
const authHeader = `Basic ${btoa(`${username}:${password}`)}`;


const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: authHeader,
  },
});

export default axiosInstance;