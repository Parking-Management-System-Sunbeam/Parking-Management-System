package com.ParkIt.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.UserRequestDto;
import com.ParkIt.Dto.UserSignInDto;
import com.ParkIt.Dto.UserUpdateReqDto;
import com.ParkIt.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
	
	private final UserService userService;
	
	//Signing Up Route
	@PostMapping("/signup")
	public ResponseEntity<?> createUser(@RequestBody @Valid UserRequestDto userDto )
	{
		
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));
	}
	
	//Signing In Route
	@PostMapping("/signin")
	public ResponseEntity<?> userLogin(@RequestBody @Valid UserSignInDto userDto )
	{
		
		return ResponseEntity.status(HttpStatus.OK).body(userService.userSignin(userDto));
	}
	
	

//		GET    /users                    - Get all active users
//	@GetMapping("/")
//	public ResponseEntity<?> getAllUsers(){
//		return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
//	}

//	GET    /users/getAdmin                    - Get all active admins
@GetMapping("/getAdmin")
public ResponseEntity<?> getAllUsers(){
	return ResponseEntity.status(HttpStatus.OK).body(userService.getAllAdmins());
}
	
// GET    /users/{id}               - Get user by ID

@GetMapping("/{id}")
public ResponseEntity<?> getUserById(@PathVariable Long id){
	return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
}

//		PUT    /users/{id}               - Update user
	@PatchMapping("/update/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id ,@RequestBody UserUpdateReqDto user){
		return ResponseEntity.status(HttpStatus.OK).body(userService.patchUser(id,user));
	}
	
//		DELETE /users/{id}               - Delete user	
//	@DeleteMapping("/delete/{id}")
//	public ResponseEntity<?> deleteUser(@PathVariable Long id ){
//		return ResponseEntity.status(HttpStatus.OK).body(userService.softDelete(id));
//	}
	

}
