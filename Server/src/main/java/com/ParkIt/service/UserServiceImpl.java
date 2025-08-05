package com.ParkIt.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.UserDao;
import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.UserRequestDto;
import com.ParkIt.Dto.UserSignInDto;
import com.ParkIt.Dto.UserSignInResponseDto;
import com.ParkIt.Entities.User;
import com.ParkIt.GlobalExceptionHandler.AlreadyExistsException;
import com.ParkIt.GlobalExceptionHandler.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl  implements UserService {
	
	private UserDao userDao;
	private ModelMapper mapper;
	@Override
	public ApiResponse createUser(UserRequestDto user) {
		
		if(userDao.existsByEmail(user.getEmail()))
		{
			throw new AlreadyExistsException("User is already present with email :" + user.getEmail() );
		}
		System.out.println(user);
	
		User persistUser=mapper.map(user, User.class);
		System.out.println(persistUser);
		userDao.save(persistUser);
		return new ApiResponse("User saved successfully ");
	}
	
	
	@Override
	public UserSignInResponseDto userSignin(UserSignInDto user) {
		 User persistUser = userDao.findByEmail(user.getEmail())
				 .orElseThrow(() -> new ResourceNotFoundException("User Email invalid"));
		 if(!persistUser.getPassword().equals(user.getPassword()))
			 throw new ResourceNotFoundException("User password invalid");
		 
		 System.out.println(persistUser);
		 
		return mapper.map(persistUser, UserSignInResponseDto.class);
	}
	
	
	
	
	
	

}
