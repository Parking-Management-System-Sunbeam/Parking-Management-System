package com.ParkIt.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.LocationRequestDto;
import com.ParkIt.service.LocationService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/location")
public class LocationController {

	private LocationService locationService;
	
	@PostMapping("/{id}")
	public ResponseEntity<?> createParkingPlace(@RequestBody @Valid  LocationRequestDto dto, Long userId)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body(locationService.createLocation(dto, userId));
	}
	
	@GetMapping
	public ResponseEntity<?> getAllLocations()
	{
		return ResponseEntity.ok(locationService.getAllLocations());
	}
	
	@GetMapping("/{pincode}")
	public ResponseEntity<?> searchByPincode(@PathVariable String pincode)
	{
		return ResponseEntity.ok(locationService.searchByPincode(pincode));
	}
}
