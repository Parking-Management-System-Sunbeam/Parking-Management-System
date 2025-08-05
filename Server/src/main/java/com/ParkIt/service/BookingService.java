package com.ParkIt.service;

import java.time.LocalDateTime;
import java.util.List;

import com.ParkIt.Dto.BookingGetAllResDto;
import com.ParkIt.Dto.BookingReqDto;
import com.ParkIt.Dto.BookinngResDto;
import com.ParkIt.Dto.SlotAvailabilityResDto;
import com.ParkIt.Entities.BookingStatus;

public interface BookingService {
	
	// List of slot including availblity
	List<SlotAvailabilityResDto> getSlotAvailability(Long locationId, LocalDateTime startTime, LocalDateTime endTime);
	
	// Add booking into booking table
	BookinngResDto createBooking(BookingReqDto requestDto);
	
	// Get all bookings 
	List<BookingGetAllResDto> getAllBookings();
	
	// Get booking by booking id
	BookingGetAllResDto getBookingById(Long id);
	
	// Get bookings by user id
	List<BookingGetAllResDto> getBookingsByUserId(Long userId);
	
	// Get booking by status
	List<BookingGetAllResDto> getBookingsByStatus(BookingStatus status);
	
	// update booking status 
	BookingGetAllResDto updateBookingStatus(Long bookingId, BookingStatus status);
	
	// delete booking by booking id
	void deleteBookingById(Long bookingId);

}
