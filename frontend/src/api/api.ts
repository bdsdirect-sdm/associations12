import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // backend base URL
});

export const registerUser = async (data: FormData) => {
  return await API.post('/auth/register', data);
};

export const loginUser = async (email: string, password: string) => {
  return await API.post('/auth/login', { email, password });
};

export const resetPassword = async (password: string) => {
  return await API.post('/auth/reset-password', { password });
};
