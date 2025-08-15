import axios from 'axios';
import { BASE_URL } from '../Utils/Helper';



export const getMonthlyPayments = async (locationId) => {
  try {
    const token = localStorage.getItem('token') || '';
    const response = await axios.get(`${BASE_URL}/payment/income/monthly/${locationId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch monthly payments:', error);
    throw error.response?.data || 'Failed to fetch monthly payments';
  }
};

export const getYearlyPayments = async (locationId) => {
  try {
    const token = localStorage.getItem('token') || '';  
    const response = await axios.get(`${BASE_URL}/payment/income/yearly/${locationId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch yearly payments:', error);
    throw error.response?.data || 'Failed to fetch yearly payments';
  } 
};