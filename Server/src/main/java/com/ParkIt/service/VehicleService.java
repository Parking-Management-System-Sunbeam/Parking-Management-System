package com.ParkIt.service;

import java.util.List;

import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.VehicleRequestDto;
import com.ParkIt.Dto.VehicleResponseDto;

public interface VehicleService  {
	List<VehicleResponseDto> getAllVehicles(Long id);

	List<VehicleResponseDto> getTwoWheelers(Long id);

	List<VehicleResponseDto> getFourWheelers(Long id);
	
	ApiResponse createVehicle(VehicleRequestDto dto);
	
	ApiResponse updateVehicle(Long id, VehicleRequestDto dto);
	
}
