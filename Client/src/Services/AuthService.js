// services/authService.js
import axios from "axios";
import { BASE_URL } from "../Utils/Helper";



export const loginService = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/user/signin`, { email, password });
  return response.data; 
};

export const signupService = async (userData) => {
  const response = await axios.post(`${BASE_URL}/user/signup`, userData);
  return response.data;
};

export const updateUserService = async (updatedUserData, token) => {
  const response = await axios.patch(`${BASE_URL}/user/update`, updatedUserData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
