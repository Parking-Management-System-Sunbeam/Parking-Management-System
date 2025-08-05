package com.ParkIt.service;

import java.util.List;

import com.ParkIt.Dto.BookingRequestDto;
import com.ParkIt.Dto.BookingResponseDto;
import com.ParkIt.Entities.Booking;

public interface BookingService {
	BookingResponseDto createBooking(BookingRequestDto dto);

	BookingResponseDto getBookingById(Long id);

	void cancelBooking(Long id);

	List<BookingResponseDto> getBookingsByUser(Long userId);
}
