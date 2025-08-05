package com.ParkIt.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.BookingRepository;
import com.ParkIt.Dao.LocationRepository;
import com.ParkIt.Dao.SlotRepository;
import com.ParkIt.Dao.UserRepository;
import com.ParkIt.Dao.VehicleRepository;
import com.ParkIt.Dto.BookingRequestDto;
import com.ParkIt.Dto.BookingResponseDto;
import com.ParkIt.Entities.Booking;
import com.ParkIt.Entities.BookingStatus;
import com.ParkIt.Entities.Location;
import com.ParkIt.Entities.Slot;
import com.ParkIt.Entities.User;
import com.ParkIt.Entities.Vehicle;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {
    
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final SlotRepository slotRepository;
    private final VehicleRepository vehicleRepository;
    private final LocationRepository locationRepository;

    @Override
    public BookingResponseDto createBooking(BookingRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User Not found"));

        Slot slot = slotRepository.findById(requestDto.getSlotId())
                .orElseThrow(() -> new IllegalArgumentException("Slot not found"));

        Vehicle vehicle = vehicleRepository.findById(requestDto.getVehicleId())
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));

        Location location = locationRepository.findById(requestDto.getLocationId())
                .orElseThrow(() -> new IllegalArgumentException("Location not found"));

        if (!slot.getLocation().getId().equals(location.getId())) {
            throw new IllegalArgumentException("Slot does not belong to the selected location");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setSlot(slot);
        booking.setVehicle(vehicle);
        booking.setLocation(location);
        booking.setStartTime(requestDto.getStartTime());
        booking.setEndTime(requestDto.getEndTime());
        booking.setStatus(BookingStatus.CONFIRMED);

        Booking savedBooking = bookingRepository.save(booking);

        return mapToResponseDto(savedBooking);
    }

    @Override
    public BookingResponseDto getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        return mapToResponseDto(booking);
    }

    @Override
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    @Override
    public List<BookingResponseDto> getBookingsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Booking> bookings = bookingRepository.findByUser(user);
        return bookings.stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    //helPer method
    private BookingResponseDto mapToResponseDto(Booking booking) {
        BookingResponseDto response = new BookingResponseDto();
        response.setBookingId(booking.getId());
        response.setUserId(booking.getUser().getId());
        response.setSlotId(booking.getSlot().getId());
        response.setVehicleId(booking.getVehicle().getId());
        response.setLocationId(booking.getLocation().getId());
        response.setStartTime(booking.getStartTime());
        response.setEndTime(booking.getEndTime());
        response.setStatus(booking.getStatus().toString());
        return response;
    }
}
