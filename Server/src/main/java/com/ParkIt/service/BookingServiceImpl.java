package com.ParkIt.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.BookingDao;
import com.ParkIt.Dao.LocationDao;
import com.ParkIt.Dao.PaymentDao;
import com.ParkIt.Dao.SlotDao;
import com.ParkIt.Dao.UserDao;
import com.ParkIt.Dto.BookingGetAllResDto;
import com.ParkIt.Dto.BookingReqDto;
import com.ParkIt.Dto.BookinngResDto;
import com.ParkIt.Dto.SlotAvailabilityResDto;
import com.ParkIt.Entities.Booking;
import com.ParkIt.Entities.BookingStatus;
import com.ParkIt.Entities.Location;
import com.ParkIt.Entities.Payment;
import com.ParkIt.Entities.Slot;
import com.ParkIt.Entities.User;
import com.ParkIt.GlobalExceptionHandler.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {

	private final BookingDao bookingRepository;
    private final SlotDao slotRepository;
    private final LocationDao locationRepository;
    private final UserDao userRepository;
    private final PaymentDao paymentRepo;
    private final ModelMapper mapper;
    
	@Override
	public List<SlotAvailabilityResDto> getSlotAvailability(Long locationId, LocalDateTime startTime,
			LocalDateTime endTime) {
		
		Location location = locationRepository.findById(locationId)
		        .orElseThrow(() -> new ResourceNotFoundException("Location with ID " + locationId + " not found."));

		
		List<Slot> allSlots = slotRepository.findByLocationId(locationId);
		
		List<Long> bookedSlotIds = bookingRepository.
				findBookedSlotIds(locationId, startTime, endTime, BookingStatus.CONFIRMED);
		
		
		return allSlots.stream()
	            .map(slot -> {
	                boolean isAvailable = !bookedSlotIds.contains(slot.getId());
	                return new SlotAvailabilityResDto(
	                        slot.getId(),
	                        slot.getSlotName(),
	                        isAvailable,
	                        locationId
	                );
	            })
	            .collect(Collectors.toList());
	}


	@Override
	public BookinngResDto createBooking(BookingReqDto dto) {
		
		 User user = userRepository.findById(dto.getUserId())
	                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
		
		 Slot slot = slotRepository.findById(dto.getSlotId())
	                .orElseThrow(() -> new ResourceNotFoundException("Slot not found"));
		 Location location = locationRepository.findById(dto.getLocationId())
	                .orElseThrow(() -> new ResourceNotFoundException("Location not found"));
		 
		 // Ensuring slot belong to given location id
		 if (!slot.getLocation().getId().equals(location.getId())) {
	            throw new IllegalArgumentException("Slot does not belong to provided location");
	        }
		 
		 Booking booking = mapper.map(dto, Booking.class);
		 booking.setUserId(user);
	        booking.setSlotId(slot);
	        booking.setLocationId(location);
	        booking.setStatus(BookingStatus.CONFIRMED);
	        
	        // save booking into table
	        Booking saved = bookingRepository.save(booking);
	        
	        
	        //  create payment 
	        
	        Payment payment = new Payment();
	        payment.setAmount(dto.getPayment().getAmount());
	        payment.setPaymentMode(dto.getPayment().getPaymentMode());
	        payment.setPaymentStatus("CONFIRMED");
	        payment.setPaymentDate(LocalDateTime.now());
	        payment.setBooking(booking); // Link booking

	        paymentRepo.save(payment); // Save payment
	        
	        // Convert to response
	        BookinngResDto responseDto = new BookinngResDto();
	        responseDto.setId(saved.getId());
//	        responseDto.setUserId(user.getId());
	        responseDto.setUserName(user.getUserName());
//	        responseDto.setSlotId(slot.getId());
	        responseDto.setSlotName(slot.getSlotName());
//	        responseDto.setLocationId(location.getId());
	        responseDto.setLocationName(location.getLocationName());
	        responseDto.setStartTime(saved.getStartTime());
	        responseDto.setEndTime(saved.getEndTime());
	        responseDto.setStatus(saved.getStatus());
	        responseDto.setLicenseNumber(saved.getLicenseNumber());
	        
		return responseDto;
	}


	@Override
	public List<BookingGetAllResDto> getAllBookings() {
		 List<Booking> bookings = bookingRepository.findAll();
		 
		 // check if emtpy then throw exception
		 if (bookings.isEmpty()) {
	            throw new ResourceNotFoundException("No bookings found");
	        }
		 
		 
		 return bookings.stream().map(booking -> convertToDto(booking)).collect(Collectors.toList());
	}
	
	// helper method
	 private BookingGetAllResDto convertToDto(Booking booking) {
		 BookingGetAllResDto dto = new BookingGetAllResDto();

	        dto.setBookingId(booking.getId());
	        dto.setUserId(booking.getUserId().getId());
	        dto.setUserName(booking.getUserId().getUserName());
	        dto.setLocationId(booking.getLocationId().getId());
	        dto.setLocationName(booking.getLocationId().getLocationName());
	        dto.setSlotId(booking.getSlotId().getId());
	        dto.setSlotName(booking.getSlotId().getSlotName());
	        dto.setLicenseNumber(booking.getLicenseNumber());
	        dto.setStartTime(booking.getStartTime());
	        dto.setEndTime(booking.getEndTime());
	        dto.setStatus(booking.getStatus());

	        return dto;
	    }


	@Override
	public BookingGetAllResDto getBookingById(Long id) {
		  Booking booking = bookingRepository.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
		  BookingGetAllResDto dto = new BookingGetAllResDto();
		 
		  	dto.setBookingId(booking.getId());

	        // User
	        dto.setUserId(booking.getUserId().getId());
	        dto.setUserName(booking.getUserId().getUserName());

	        // Location
	        dto.setLocationId(booking.getLocationId().getId());
	        dto.setLocationName(booking.getLocationId().getLocationName());

	        // Slot
	        dto.setSlotId(booking.getSlotId().getId());
	        dto.setSlotName(booking.getSlotId().getSlotName());

	        // Others
	        dto.setLicenseNumber(booking.getLicenseNumber());
	        dto.setStartTime(booking.getStartTime());
	        dto.setEndTime(booking.getEndTime());
	        dto.setStatus(booking.getStatus());

	        return dto;
	}


	@Override
	public List<BookingGetAllResDto> getBookingsByUserId(Long userId) {
		 List<Booking> bookings = bookingRepository.findByUserId_Id(userId);

		    if (bookings.isEmpty()) {
		        throw new ResourceNotFoundException("No bookings found for user ID: " + userId);
		    }

		    return bookings.stream()
		                   .map(booking -> mapBookingToBookingGetAllResDto(booking))
		                   .collect(Collectors.toList());
	}
	
	// helper method
	
	private BookingGetAllResDto mapBookingToBookingGetAllResDto(Booking booking) {
		BookingGetAllResDto dto = new BookingGetAllResDto();

		    dto.setBookingId(booking.getId());
		    dto.setUserId(booking.getUserId().getId());
		    dto.setUserName(booking.getUserId().getUserName());
		    dto.setLocationId(booking.getLocationId().getId());
		    dto.setLocationName(booking.getLocationId().getLocationName());
		    dto.setSlotId(booking.getSlotId().getId());
		    dto.setSlotName(booking.getSlotId().getSlotName());
		    dto.setLicenseNumber(booking.getLicenseNumber());
		    dto.setStartTime(booking.getStartTime());
		    dto.setEndTime(booking.getEndTime());
		    dto.setStatus(booking.getStatus());
	    return dto;
	}


	@Override
	public List<BookingGetAllResDto> getBookingsByStatus(BookingStatus status) {
		 List<Booking> bookings = bookingRepository.findByStatus(status);
		    return bookings.stream()
		    		.map(booking -> mapBookingToBookingGetAllResDto(booking))
		                   .collect(Collectors.toList());
	}


	@Override
	public BookingGetAllResDto updateBookingStatus(Long bookingId, BookingStatus status) {
		Booking booking = bookingRepository.findById(bookingId)
		        .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

		    booking.setStatus(status);
		    Booking updatedBooking = bookingRepository.save(booking);

		    return mapBookingToBookingGetAllResDto(updatedBooking);
	}


	@Override
	public void deleteBookingById(Long bookingId) {
		 Booking booking = bookingRepository.findById(bookingId)
			        .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

			    bookingRepository.delete(booking);
	}

}
