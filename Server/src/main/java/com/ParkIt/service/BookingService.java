package com.ParkIt.service;

import java.time.LocalDateTime;
import java.util.List;

import com.ParkIt.Dto.BookingReqDto;
import com.ParkIt.Dto.BookinngResDto;
import com.ParkIt.Dto.SlotAvailabilityResDto;

public interface BookingService {
	
	// List of slot including availblity
	List<SlotAvailabilityResDto> getSlotAvailability(Long locationId, LocalDateTime startTime, LocalDateTime endTime);
	
	// Add booking into booking table
	BookinngResDto createBooking(BookingReqDto requestDto);
}
