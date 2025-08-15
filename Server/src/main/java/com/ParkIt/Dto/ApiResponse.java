package com.ParkIt.Dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter


public class ApiResponse {
	
	private String msg;
	private LocalDateTime created_At; 
	
	public ApiResponse(String msg)
	{
		this.msg=msg;
		this.created_At=LocalDateTime.now();
	}

}
