package com.ParkIt.service;

import java.util.List;

import com.ParkIt.Dto.LocationRequestDto;
import com.ParkIt.Dto.LocationResponseDto;

public interface LocationService {
	
	    LocationResponseDto createLocation(LocationRequestDto dto, Long userId);

	    // Update Location
	    LocationResponseDto updateLocation(Long locationId, LocationRequestDto dto);

	    // Delete Location
	    void deleteLocation(Long locationId);
	    
	    public List<LocationResponseDto> getAllLocations();
	    
	    List<LocationResponseDto> searchByPincode(String pincode);
	    



}
