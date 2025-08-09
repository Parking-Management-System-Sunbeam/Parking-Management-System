// services/authService.js
import axios from "axios";
import { BASE_URL } from "../Utils/Helper";



export const loginService = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data; 
};

export const signupService = async (userData) => {
  const response = await axios.post(`${BASE_URL}/signup`, userData);
  return response.data;
};

export const updateUserService = async (updatedUserData, token) => {
  const response = await axios.put(`${BASE_URL}/update`, updatedUserData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
