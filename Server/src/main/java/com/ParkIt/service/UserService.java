package com.ParkIt.service;

import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.UserRequestDto;
import com.ParkIt.Dto.UserSignInDto;
import com.ParkIt.Dto.UserSignInResponseDto;

public interface UserService {
	
	//signup
	ApiResponse createUser(UserRequestDto user);
	
	//signin
	UserSignInResponseDto userSignin(UserSignInDto user);

}
