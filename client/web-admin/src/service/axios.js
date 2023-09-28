import axios from 'axios';

const ApiRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  withCredentials: true,
});

export default ApiRequest;
