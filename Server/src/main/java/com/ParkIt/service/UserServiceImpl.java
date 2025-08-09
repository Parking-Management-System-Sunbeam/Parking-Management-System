package com.ParkIt.service;

import java.util.List;
//import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.UserDao;
import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.UserRequestDto;
import com.ParkIt.Dto.UserSignInDto;
import com.ParkIt.Dto.UserSignInResponseDto;
import com.ParkIt.Dto.UserUpdateReqDto;
import com.ParkIt.Entities.User;
import com.ParkIt.Entities.UserRole;
import com.ParkIt.GlobalExceptionHandler.AlreadyExistsException;
import com.ParkIt.GlobalExceptionHandler.ResourceNotFoundException;
import com.ParkIt.Security.JwtUtil;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl  implements UserService {
	
	private UserDao userDao;
	private ModelMapper mapper;
	 private BCryptPasswordEncoder passwordEncoder;
	 private JwtUtil jwtUtil;
	
	
	@Override
	public ApiResponse createUser(UserRequestDto user) {
		
		if(userDao.existsByEmail(user.getEmail()))
		{
			throw new AlreadyExistsException("User is already present with email : " + user.getEmail() );
		}
	
		User persistUser=mapper.map(user, User.class);
		
		   // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        persistUser.setPassword(hashedPassword);
		System.out.println(persistUser);
		userDao.save(persistUser);
		return new ApiResponse("User saved successfully ");
	}
	
	
	@Override
	public UserSignInResponseDto userSignin(UserSignInDto user) {
		 User persistUser = userDao.findByEmail(user.getEmail())
				 .orElseThrow(() -> new ResourceNotFoundException("User Email invalid"));
		  if(!passwordEncoder.matches(user.getPassword(), persistUser.getPassword())) {
	            throw new ResourceNotFoundException("User password invalid");
	        }
		 System.out.println(persistUser);
		 
		 String token = jwtUtil.generateToken(persistUser);
		 
		 UserSignInResponseDto responseDto = mapper.map(persistUser, UserSignInResponseDto.class);
	        responseDto.setToken(token);
	        
	        return responseDto;
	}


	//update user
	@Override
	public ApiResponse patchUser(Long id, UserUpdateReqDto userDto) {
		 User newUser = userDao.findById(id)
				 .orElseThrow(() -> new ResourceNotFoundException("User not found"));
		 
		 if(userDto.getImg() != null) {
			 newUser.setImg(userDto.getImg());
		 }
		 
		 if(userDto.getPhone() != null) {
			 newUser.setPhone(userDto.getPhone());
		 }
		 if(userDto.getUserName() != null) {
			 newUser.setUserName(userDto.getUserName());
		 }
		 
		 return new ApiResponse("User Updated successfully ");
	}




// Getting active users
//	@Override
//	public List<UserSignInResponseDto> getAllUsers() {
//		List<User> users = userDao.findByIsDeletedFalse();
//		return users.stream().map(u->mapper.map(u, UserSignInResponseDto.class)).collect(Collectors.toList());
//				
//	}

	
	@Override
	public List<UserSignInResponseDto> getAllAdmins() {
		List<User> users = userDao.findByUserRole(UserRole.ADMIN);
		
		
			return users.stream().map(u->mapper.map(u,UserSignInResponseDto.class)).collect(Collectors.toList());
		
	}


	@Override
	public UserSignInResponseDto getUserById(Long id) {
		User user = userDao.findById(id).orElseThrow(()-> new ResourceNotFoundException("User not found"));
//		if(user.isDeleted == true) {
//			// TODO return 
//		}
		
		return mapper.map(user, UserSignInResponseDto.class);
	}

//	//Soft Deleted future scope
//	@Override
//	public ApiResponse softDelete(Long id) {
//		 User user = userDao.findById(id)
//				 .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//		
//		 user.setIsDeleted(true);
//		 
//		return new ApiResponse("User Deleted ");
//	}
//	

}
