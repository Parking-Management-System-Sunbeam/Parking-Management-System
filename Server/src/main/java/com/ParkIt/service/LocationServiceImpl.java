package com.ParkIt.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.LocationDao;
import com.ParkIt.Dao.UserDao;
import com.ParkIt.Dto.LocationRequestDto;
import com.ParkIt.Dto.LocationResponseDto;
import com.ParkIt.Entities.User;
import com.ParkIt.GlobalExceptionHandler.AlreadyExistsException;
import com.ParkIt.GlobalExceptionHandler.ResourceNotFoundException;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import com.ParkIt.Entities.Location;
import com.ParkIt.Entities.Slot;

@Service
@Transactional
@AllArgsConstructor
@Getter
@Setter
public class LocationServiceImpl implements LocationService{

  

	private ModelMapper mapper;
	private LocationDao locationDao;
	private UserDao userDao;

   
    
	@Override
	public LocationResponseDto createLocation(LocationRequestDto dto, Long userId) {
	    // 1. Validate user
	    User user = userDao.findById(userId)
	        .orElseThrow(() -> new ResourceNotFoundException("User is not found with this id"));

	    // 2. Map DTO to Entity
	    Location location = mapper.map(dto, Location.class);

	    // Optional: Set user to location if your Location has a User field
	    // location.setUser(user);

	    // 3. Generate slots
	    int numberOfSlots = location.getNoOfSlots();
	    for (int i = 1; i <= numberOfSlots; i++) {
	        Slot slot = new Slot();
	        slot.setSlot_name("SLOT :" + i);
	        slot.setAvailable(true);
	        slot.setLocation(location);         // very important for FK
	        location.getSlots().add(slot);
	    }

	    // 4. Save location (slots will be saved via CascadeType.ALL)
	    Location savedLocation = locationDao.save(location);

	    // 5. Convert to response DTO
	    return mapper.map(savedLocation, LocationResponseDto.class);
	}


	@Override
	public LocationResponseDto updateLocation(Long locationId, LocationRequestDto dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteLocation(Long locationId) {
		
		
		 
	}


	@Override
	public List<LocationResponseDto> getAllLocations() {
		
		List<Location> locations=locationDao.findAll();
		List<LocationResponseDto> dtos=new ArrayList<>();
		for(Location l : locations )
		{
			LocationResponseDto dto=mapper.map(l, LocationResponseDto.class);
			dtos.add(dto);
		}
		return dtos;
	}


	@Override
	public List<LocationResponseDto> searchByPincode(String pincode) {
		
		 List<Location> locations = locationDao.findByPincode(pincode);

		    if (locations.isEmpty()) {
		        throw new ResourceNotFoundException("No locations found with pincode: " + pincode);
		    }

		List<LocationResponseDto> dtos=new ArrayList<>();
		for(Location l : locations)
		{
			LocationResponseDto dto=mapper.map(l, LocationResponseDto.class);
			dtos.add(dto);
		}
		
		return dtos;
		
		
		
	}
	
	
	
	

	
	

}
