package com.ParkIt.Dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BookingRequestDto {

	private Long userId;
	private Long vehicleId;
	private Long slotId;
	private Long locationId;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
}
