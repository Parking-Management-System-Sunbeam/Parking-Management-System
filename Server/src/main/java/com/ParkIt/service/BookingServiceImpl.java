package com.ParkIt.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.BookingDao;
import com.ParkIt.Dao.LocationDao;
import com.ParkIt.Dao.SlotDao;
import com.ParkIt.Dao.UserDao;
import com.ParkIt.Dto.BookingReqDto;
import com.ParkIt.Dto.BookinngResDto;
import com.ParkIt.Dto.SlotAvailabilityResDto;
import com.ParkIt.Entities.Booking;
import com.ParkIt.Entities.BookingStatus;
import com.ParkIt.Entities.Location;
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
}
