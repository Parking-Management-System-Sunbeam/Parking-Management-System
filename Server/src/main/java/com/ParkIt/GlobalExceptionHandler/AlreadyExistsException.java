package com.ParkIt.GlobalExceptionHandler;

public class AlreadyExistsException extends RuntimeException {
	
	public AlreadyExistsException(String msg)
	{
		super(msg);
	}

}
