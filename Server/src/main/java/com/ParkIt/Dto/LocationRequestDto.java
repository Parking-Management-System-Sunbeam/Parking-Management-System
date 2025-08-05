package com.ParkIt.Dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LocationRequestDto {
	
	  @NotBlank(message = "Location name is required")
	    private String location_name;

	    @NotBlank(message = "Pincode is required")
	    @Pattern(regexp = "\\d{6}", message = "Pincode must be a 6-digit number")
	    private String pincode;

	    @NotNull(message = "Price is required")
	    @Min(value = 1, message = "Price must be greater than 0")
	    private Integer price;

	    @NotBlank(message = "Image URL or path is required")
	    private String image;

}
