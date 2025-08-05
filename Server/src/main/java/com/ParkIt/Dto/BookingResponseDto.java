package com.ParkIt.Dto;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class BookingResponseDto {
	private Long bookingId;
    private Long userId;
    private Long vehicleId;
    private Long slotId;
    private Long locationId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status; // e.g., CONFIRMED, CANCELLED, PENDING
}
