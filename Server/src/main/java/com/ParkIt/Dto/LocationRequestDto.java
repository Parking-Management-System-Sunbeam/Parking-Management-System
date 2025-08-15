package com.ParkIt.Dto;

import java.util.List;

import com.ParkIt.Entities.VehicleType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LocationRequestDto {
	
		
		private Long userId;
	
	  @NotBlank(message = "Location name is required")
	    private String locationName;

	    @NotBlank(message = "Pincode is required")
	    @Pattern(regexp = "\\d{6}", message = "Pincode must be a 6-digit number")
	    private String pincode;

	    @NotNull(message = "Price is required")
	    @Min(value = 1, message = "Price must be greater than 0")
	    private Integer price;

	   
	    private String image;

	    @NotNull(message = "Number of slots is required")
	    @Min(value = 1, message = "Number of slots must be at least 1")
	    private Integer numberOfSlots;
	    
	    @NotEmpty(message = "vehicle type must be given")
	    private List<VehicleType> vehicleTypes;

	    @NotBlank(message = "Description is required")
	    private String description;
	    
	    private Double averageRating = 0.0; 
	    

	
}
