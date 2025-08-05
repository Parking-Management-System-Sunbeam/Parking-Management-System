package com.ParkIt.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.BookingRequestDto;
import com.ParkIt.Dto.BookingResponseDto;
import com.ParkIt.Entities.Booking;
import com.ParkIt.service.BookingService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/booking")
public class BookingController {

	private final BookingService bookingService;
	@PostMapping("/create")
	public ResponseEntity<?> createBooking(@RequestBody BookingRequestDto requestDto){
		BookingResponseDto responseDto = bookingService.createBooking(requestDto);
		return ResponseEntity.ok(responseDto);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getBookingById(@PathVariable Long id){
		BookingResponseDto responseDto = bookingService.getBookingById(id);
		return ResponseEntity.ok(responseDto);
	}
	@DeleteMapping("/{id}/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Booking canceled successfully");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponseDto>> getBookingsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId));
    }
	
}
