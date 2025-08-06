package com.ParkIt.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.LocationRequestDto;
import com.ParkIt.Dto.LocationResponseDto;
import com.ParkIt.service.LocationService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/locations")
public class LocationController {

	
	 private final LocationService locationService;
	 
	 
	 // Get all locations 
	 
	 @GetMapping("/get/all")
	    public ResponseEntity<List<LocationResponseDto>> getAllLocations() {
	        List<LocationResponseDto> locations = locationService.getAllLocations();
	        return ResponseEntity.ok(locations);
	    }
	 
	 //Get location by given id
	 
	 @GetMapping("/get/{id}")
	    public ResponseEntity<LocationResponseDto> getLocationById(@PathVariable Long id) {
	        LocationResponseDto dto = locationService.getLocationById(id);
	        return ResponseEntity.ok(dto);
	    }
	 
	 // Get location by pincode
	 @GetMapping("/pincode/{pincode}")
	    public ResponseEntity<List<LocationResponseDto>> getLocationsByPincode(@PathVariable String pincode) {
	        List<LocationResponseDto> locations = locationService.getLocationsByPincode(pincode);
	        return ResponseEntity.ok(locations);
	    }
	 
	 
	 // Search location by location name
	 @GetMapping("/search")
	    public ResponseEntity<List<LocationResponseDto>> searchLocations(@RequestParam("name") String name) {
	        List<LocationResponseDto> locations = locationService.searchLocationsByName(name);
	        return ResponseEntity.ok(locations);
	    }
	 
	 // Add location with n slots
	 
	 @PostMapping("/add")
	    public ResponseEntity<LocationResponseDto> createLocation(
	            @Valid @RequestBody LocationRequestDto dto) {
	        LocationResponseDto response = locationService.createLocation(dto);
	        return new ResponseEntity<>(response, HttpStatus.CREATED);
	    }
	
	 // delete location by id
	 
	 @DeleteMapping("/{id}")
	 public ResponseEntity<String> deleteLocation(@PathVariable Long id) {
	     locationService.deleteLocation(id);
	     return ResponseEntity.ok("Location deleted successfully");
	 }
	 
	 // Update location by id
	 
	 @PutMapping("/{id}")
	 public ResponseEntity<LocationResponseDto> updateLocation(@PathVariable Long id,
	                                                           @RequestBody @Valid LocationRequestDto dto) {
	     LocationResponseDto updated = locationService.updateLocation(id, dto);
	     return ResponseEntity.ok(updated);
	 }
}
