package com.ParkIt.GlobalExceptionHandler;

public class ResourceNotFoundException extends RuntimeException {
	String msg;
	public ResourceNotFoundException(String msg)
	{
		super(msg);
	}

}
