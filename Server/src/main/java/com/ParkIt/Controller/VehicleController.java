package com.ParkIt.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.VehicleRequestDto;
import com.ParkIt.Dto.VehicleResponseDto;
import com.ParkIt.service.VehicleService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/vehicle")
@AllArgsConstructor
public class VehicleController {
	
	private final VehicleService vehicleService;
	
	@GetMapping("/{id}")
    public ResponseEntity<?> getAllVehicles(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(  vehicleService.getAllVehicles(id));
        
    }

    @PostMapping
    public ResponseEntity<?> createVehicle(@RequestBody VehicleRequestDto dto) {
    
        return ResponseEntity.status(HttpStatus.CREATED).body(  vehicleService.createVehicle(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVehicle(@PathVariable Long id, @RequestBody VehicleRequestDto dto) {
        ApiResponse updated = vehicleService.updateVehicle(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @GetMapping("two-wheel/{id}")
    public ResponseEntity<?> getTwoWheelers(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(  vehicleService.getTwoWheelers(id));
        
    }
    @GetMapping("four-wheel/{id}")
    public ResponseEntity<?> getFourWheelers(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(  vehicleService.getFourWheelers(id));
        
    }
}
