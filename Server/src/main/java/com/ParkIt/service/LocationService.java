package com.ParkIt.service;

import java.util.List;

import com.ParkIt.Dto.LocationRequestDto;
import com.ParkIt.Dto.LocationResponseDto;

public interface LocationService {
		// Add locations with n slots
	    LocationResponseDto createLocation(LocationRequestDto dto);

	    // Get all locations
	    List<LocationResponseDto> getAllLocations();
	    
	    // Get location by id
	    LocationResponseDto getLocationById(Long id);

	    // get location by pincode
	    List<LocationResponseDto> getLocationsByPincode(String pincode);
	    
	    // serach location by location name
	    List<LocationResponseDto> searchLocationsByName(String name);
	    
	    // Update location by id
	    
	    LocationResponseDto updateLocation(Long id, LocationRequestDto dto);
	    
	    // Delete location by id
	    void deleteLocation(Long id);
}
