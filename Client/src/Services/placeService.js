// services/placeService.js
import axios from "axios";
import { BASE_URL } from "../Utils/Helper";

export const addPlaceService = async (placeData, token) => {
  const response = await axios.post(`${BASE_URL}/locations/add`, placeData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const getAllLocations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/locations/get/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all locations:", error);
    throw error.response?.data || "Failed to fetch locations";
  }
};

export const updateLocation = async (locationId, updatedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/locations/${locationId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating location with ID ${locationId}:`, error);
    throw error.response?.data || "Failed to update location";
  }
};

export const deleteLocation = async (locationId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/locations/${locationId}`,
   
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting location with ID ${locationId}:`, error);
    throw error.response?.data || "Failed to update location";
  }
};