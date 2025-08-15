package com.ParkIt.Dto;

import java.time.LocalDateTime;

import com.ParkIt.Entities.BookingStatus;

import lombok.Data;

@Data
public class BookingGetAllResDto {
	
	    private Long bookingId;
	    private Long userId;
	    private String userName;
	    private Long locationId;
	    private String locationName;
	    private Long slotId;
	    private String slotName;
	    private String licenseNumber;
	    private LocalDateTime startTime;
	    private LocalDateTime endTime;
	    private BookingStatus status;
	}

