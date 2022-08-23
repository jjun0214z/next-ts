import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;
