package com.ParkIt.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.BookingGetAllResDto;
import com.ParkIt.Dto.BookingReqDto;
import com.ParkIt.Dto.BookinngResDto;
import com.ParkIt.Dto.SlotAvailabilityReqDto;
import com.ParkIt.Dto.SlotAvailabilityResDto;
import com.ParkIt.Entities.BookingStatus;
import com.ParkIt.service.BookingService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/bookings")
public class BookingController {

	private final BookingService bookingService;
	
	// Get all bookings 
	
	 @GetMapping("/getall")
	    public ResponseEntity<List<BookingGetAllResDto>> getAllBookings() {
	        List<BookingGetAllResDto> bookings = bookingService.getAllBookings();
	        return ResponseEntity.ok(bookings);
	    }
	 
	// Get booking by booking id 
	 
	 @GetMapping("getbyid/{id}")
	    public ResponseEntity<BookingGetAllResDto> getBookingById(@PathVariable Long id) {
		 BookingGetAllResDto responseDto = bookingService.getBookingById(id);
	        return ResponseEntity.ok(responseDto);
	    }

	 // Get booking by user id
	 
	 @GetMapping("/getbyuserid/{userId}")
	 public ResponseEntity<List<BookingGetAllResDto>> getBookingsByUserId(@PathVariable Long userId) {
	     List<BookingGetAllResDto> responseList = bookingService.getBookingsByUserId(userId);
	     return ResponseEntity.ok(responseList);
	 }
	 
	 // Get booking by status 
	 @GetMapping("/status/{status}")
	 public ResponseEntity<List<BookingGetAllResDto>> getBookingsByStatus(@PathVariable String status) {
	         BookingStatus bookingStatus = BookingStatus.valueOf(status.toUpperCase());
	      
	         return ResponseEntity.ok(bookingService.getBookingsByStatus(bookingStatus));
	    
	 }
	 
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
    
    // Update booking status 
    
    @PutMapping("update/{id}/status")
    public ResponseEntity<BookingGetAllResDto> updateBookingStatus(
            @PathVariable Long id,
            @RequestParam("status") String statusStr) {

            BookingStatus status = BookingStatus.valueOf(statusStr.toUpperCase());
            BookingGetAllResDto updatedBooking = bookingService.updateBookingStatus(id, status);
            return ResponseEntity.ok(updatedBooking);
    }
    
    // Delete booking by booking id
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBookingById(id);
        return ResponseEntity.ok("Booking deleted successfully with ID: " + id);
    }
    
}
