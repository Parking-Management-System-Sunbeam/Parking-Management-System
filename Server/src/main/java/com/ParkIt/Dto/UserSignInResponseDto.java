package com.ParkIt.Dto;

import com.ParkIt.Entities.UserRole;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserSignInResponseDto {

	private String userName;
	 
	private String email;
	 
	private String password;
	
	private UserRole userRole;
	
	private String phone;
	 
	private String img;
	
	
}
