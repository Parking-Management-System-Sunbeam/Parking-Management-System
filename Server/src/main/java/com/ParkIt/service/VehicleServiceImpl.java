package com.ParkIt.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.UserDao;
import com.ParkIt.Dao.VehicleDao;
import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.VehicleRequestDto;
import com.ParkIt.Dto.VehicleResponseDto;
import com.ParkIt.Entities.User;
import com.ParkIt.Entities.Vehicle;
import com.ParkIt.Entities.VehicleType;
import com.ParkIt.GlobalExceptionHandler.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class VehicleServiceImpl implements VehicleService {

	 @Autowired
	    private VehicleDao vehicleDao;

	    @Autowired
	    private UserDao userDao;

	    @Autowired
	    private ModelMapper modelMapper;

	    
//	    get all 
	    public List<VehicleResponseDto> getAllVehicles(Long userId) {
	        return vehicleDao.findAll().stream()
	                .filter(vehicle -> vehicle.getUser().getId().equals(userId)) // filter by userId
	                .map(vehicle -> modelMapper.map(vehicle, VehicleResponseDto.class))
	                .collect(Collectors.toList());
	    }

//	    adding vehicles
	    public ApiResponse createVehicle(VehicleRequestDto dto) {
	        if (vehicleDao.existsByLicensePlate(dto.getLicensePlate())) {
	            throw new RuntimeException("License plate already exists");
	        }

	        User user = userDao.findById(dto.getUserId())
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        Vehicle vehicle = new Vehicle();
	        vehicle.setLicensePlate(dto.getLicensePlate());
	        vehicle.setVehicleType(dto.getVehicleType());
	        vehicle.setUser(user);

	        Vehicle saved = vehicleDao.save(vehicle);
	        return new ApiResponse("Vehicle added");
  }

	    
	    //update
	    public ApiResponse updateVehicle(Long id, VehicleRequestDto dto) {
	        Vehicle vehicle = vehicleDao.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

	        if (dto.getLicensePlate() != null && !vehicle.getLicensePlate().equals(dto.getLicensePlate()) &&
	        		vehicleDao.existsByLicensePlate(dto.getLicensePlate())) {
	            throw new RuntimeException("License plate already exists");
	        }

	        if(dto.getLicensePlate() != null) {
	        	
	        	vehicle.setLicensePlate(dto.getLicensePlate());
	        }
	        
	        if(dto.getVehicleType() != null )
	        vehicle.setVehicleType(dto.getVehicleType());

	        Vehicle updated = vehicleDao.save(vehicle);
	        return new ApiResponse("Vehicle updated");
	    }

	    //get by vehicle type
		@Override
		public List<VehicleResponseDto> getTwoWheelers(Long userId) {
			
			 return vehicleDao.findAll().stream()
	                .filter(vehicle -> vehicle.getUser().getId().equals(userId))
	                .filter(type-> type.getVehicleType().equals(VehicleType.TWO_WHEELER))
	                .map(vehicle -> modelMapper.map(vehicle, VehicleResponseDto.class))
	                .collect(Collectors.toList());
	    
		}

		@Override
		public List<VehicleResponseDto> getFourWheelers(Long userId) {
			 return vehicleDao.findAll().stream()
		                .filter(vehicle -> vehicle.getUser().getId().equals(userId))
		                .filter(type-> type.getVehicleType().equals(VehicleType.FOUR_WHEELER))
		                .map(vehicle -> modelMapper.map(vehicle, VehicleResponseDto.class))
		                .collect(Collectors.toList());
		    
		}

		@Override
		public ApiResponse deleteVehicle(Long id) {
			Vehicle vehicle = vehicleDao.findById(id)
					.orElseThrow(()-> new ResourceNotFoundException("Vehicle not found"));
			
			vehicleDao.delete(vehicle);
			return new ApiResponse("Vehicle deleted succesfully");
		}
	    
	    
}
