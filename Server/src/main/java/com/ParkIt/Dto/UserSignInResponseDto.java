package com.ParkIt.Dto;

import com.ParkIt.Entities.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignInResponseDto {

	private String firstName;
	
	private String lastName;
	 
	private String email;
	 
	private String password;
	
	private UserRole userRole;
	
	private String phone;
	 
	private String img;
	
	
}
