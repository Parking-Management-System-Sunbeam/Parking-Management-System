package com.ParkIt.service;

import java.util.List;

import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.UserRequestDto;
import com.ParkIt.Dto.UserSignInDto;
import com.ParkIt.Dto.UserSignInResponseDto;
import com.ParkIt.Dto.UserUpdateReqDto;
import com.ParkIt.Entities.User;

public interface UserService {
	
	//signup
	ApiResponse createUser(UserRequestDto user);
	
	//signin
	UserSignInResponseDto userSignin(UserSignInDto user);
	
	//update user
	ApiResponse patchUser(Long id, UserUpdateReqDto user);

//	Get all active users
//	List<UserSignInResponseDto> getAllUsers()

//	Get all admins
	List<UserSignInResponseDto> getAllAdmins();
	
	// get user by id
	UserSignInResponseDto getUserById(Long id);

//	//delete User
//	ApiResponse softDelete(Long id);
}
