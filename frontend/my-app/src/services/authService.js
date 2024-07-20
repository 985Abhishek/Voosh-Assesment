import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

const logout = async () => {
  localStorage.removeItem('user');
};

const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

export default {
  login,
  signup,
  logout,
  getCurrentUser,
};

