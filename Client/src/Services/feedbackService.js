
import axios from 'axios';
import { BASE_URL } from '../Utils/Helper';


// Get feedback for a specific location
export const getFeedbackByLocation = async (locId) => {
  try {
    const response = await axios.get(`${BASE_URL}/feedback/location/${locId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

// Post new feedback
export const postFeedback = async (userId, feedbackData) => {
  try {
    const response = await axios.post(`${BASE_URL}/feedback/${userId}`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error posting feedback:', error);
    throw error;
  }
};

export const getFeedbackByUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/feedback/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user feedback:', error);
    throw error;
  }
};