package com.ParkIt.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.BookingReqDto;
import com.ParkIt.Dto.BookinngResDto;
import com.ParkIt.Dto.SlotAvailabilityReqDto;
import com.ParkIt.Dto.SlotAvailabilityResDto;
import com.ParkIt.service.BookingService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/bookings")
public class BookingController {

	private final BookingService bookingService;

	// get all slot either available or not available
	
    @PostMapping("/available-slots")
    public List<SlotAvailabilityResDto> getAvailableSlots(
            @Valid @RequestBody SlotAvailabilityReqDto requestDto) {
    	return bookingService.getSlotAvailability(
                requestDto.getLocationId(),
                requestDto.getStartTime(),
                requestDto.getEndTime()
        );
    }
    
    
    // add booking into booking table 
    
    @PostMapping("/add")
    public ResponseEntity<BookinngResDto> createBooking(@Valid @RequestBody BookingReqDto requestDto) {
    	BookinngResDto responseDto = bookingService.createBooking(requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }
    
}
