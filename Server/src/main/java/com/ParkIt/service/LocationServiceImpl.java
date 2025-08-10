package com.ParkIt.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.LocationDao;
import com.ParkIt.Dao.UserDao;
import com.ParkIt.Dto.LocationRequestDto;
import com.ParkIt.Dto.LocationResponseDto;
import com.ParkIt.Entities.Location;
import com.ParkIt.Entities.Slot;
import com.ParkIt.Entities.User;
import com.ParkIt.GlobalExceptionHandler.AlreadyExistsException;
import com.ParkIt.GlobalExceptionHandler.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class LocationServiceImpl implements LocationService{

	private final ModelMapper mapper;
	private final LocationDao locationDao;
	private final UserDao userDao;
	
	@Override
	public LocationResponseDto createLocation(LocationRequestDto dto) {
		
		if (locationDao.existsByLocationName(dto.getLocationName())) {
            throw new AlreadyExistsException("Location with same name already exists");
        }
		  Location location = mapper.map(dto, Location.class);
		 
		  User user = userDao.findById(dto.getUserId())
		            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + dto.getUserId()));
		    location.setUser(user);
		  
	        for (int i = 1; i <= dto.getNumberOfSlots(); i++) {
	            Slot slot = new Slot();
	            slot.setSlotName(dto.getLocationName() + "_Slot_" + i); 
	            slot.setLocation(location);
	            slot.setAvailable(true);
	            location.addSlot(slot);
	        }
	        Location saved = locationDao.save(location);
	        System.out.println(saved);
	        LocationResponseDto response = mapper.map(saved, LocationResponseDto.class);
		return response;
	}

	@Override
	public List<LocationResponseDto> getAllLocations() {
		 List<Location> locations = locationDao.findAll();

	        return locations.stream()
	                .map(LocationResponseDto::new)
	                .collect(Collectors.toList());
	    }

	@Override
	public LocationResponseDto getLocationById(Long id) {
		Location location = locationDao.findById(id)
		        .orElseThrow(() -> new ResourceNotFoundException("Location not found with ID: " + id));
		    return new LocationResponseDto(location);
	}

	@Override
	public List<LocationResponseDto> getLocationsByPincode(String pincode) {
		  List<Location> locations = locationDao.findByPincode(pincode);
	        if (locations.isEmpty()) {
	            throw new ResourceNotFoundException("No locations found for pincode: " + pincode);
	        }
	        return locations.stream()
	                        .map(LocationResponseDto::new)
	                        .collect(Collectors.toList());
	    }

	@Override
	public List<LocationResponseDto> searchLocationsByName(String name) {
		 List<Location> locations = locationDao.findByLocationNameContainingIgnoreCase(name);
	        if (locations.isEmpty()) {
	            throw new ResourceNotFoundException("No locations found with name containing: " + name);
	        }
	        return locations.stream()
	                        .map(LocationResponseDto::new)
	                        .collect(Collectors.toList());
	    }

	@Override
	public void deleteLocation(Long id) {
		 Location location = locationDao.findById(id)
		            .orElseThrow(() -> new ResourceNotFoundException("Location with id " + id + " not found"));

		    locationDao.delete(location);  
		
	}

	@Override
	public LocationResponseDto updateLocation(Long id, LocationRequestDto dto) {
		Location location = locationDao.findById(id)
		        .orElseThrow(() -> new ResourceNotFoundException("Location with ID " + id + " not found"));
		        
		if (!location.getLocationName().equals(dto.getLocationName())
		    && locationDao.existsByLocationName(dto.getLocationName())) {
		            throw new AlreadyExistsException("Location name already exists");
		        }
		
		location.setLocationName(dto.getLocationName());
	    location.setPincode(dto.getPincode());
	    location.setPrice(dto.getPrice());
	    location.setImage(dto.getImage());
	    location.setDescription(dto.getDescription());
	    location.setVehicleTypes(dto.getVehicleTypes());
	    
	    // Handle slot updates
	    	// removes previous slots
	    location.clearSlots(); 
	    for (int i = 1; i <= dto.getNumberOfSlots(); i++) {
	        Slot slot = new Slot();
	        slot.setSlotName(dto.getLocationName() + "_Slot_" + i); 
	        slot.setAvailable(true);
	        location.addSlot(slot);
	    }
	    Location updated = locationDao.save(location);
	    return new LocationResponseDto(updated);
	}

}
