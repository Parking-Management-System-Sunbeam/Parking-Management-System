package com.ParkIt.Dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class LocationResponseDto {

	
    private String location_name;
    private String pincode;
    private Integer price;
    private String image;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;

}
