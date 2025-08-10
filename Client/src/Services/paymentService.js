import axios from 'axios';
import { BASE_URL } from '../Utils/Helper';

// const PaymentService = {


//   async apiCall(endpoint) {
//     try {
//       const token = localStorage.getItem('token') || '';
//       const response = await axios.get(`${BASE_URL}${endpoint}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('API call failed:', error);
      
//       throw error;
//     }
//   },

//   async getMonthlyPayments(locationId) {
//     return this.apiCall(`/payment/income/monthly/${locationId}`);
//   },

 
//   async getYearlyPayments(locationId) {
//     return this.apiCall(`/payment/income/yearly/${locationId}`);
//   },

//   async getOverallPayments() {
//     return this.apiCall(`/payment/income/getall/`);
//   },
// };

// export default PaymentService;

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