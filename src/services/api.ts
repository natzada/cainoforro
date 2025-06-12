import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // o back do Spring Boot
});

export default api;
