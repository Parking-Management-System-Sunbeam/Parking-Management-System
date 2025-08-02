package com.ParkIt.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.UserRequestDto;
import com.ParkIt.Dto.UserSignInDto;
import com.ParkIt.service.UserService;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> createUser(@RequestBody @Valid UserRequestDto userDto )
	{
		
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> userLogin(@RequestBody @Valid UserSignInDto userDto )
	{
		
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.userSignin(userDto));
	}

}
