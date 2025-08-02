package com.ParkIt.service;

import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.UserRequestDto;

public interface UserService {
	
	ApiResponse createUser(UserRequestDto user);

}
