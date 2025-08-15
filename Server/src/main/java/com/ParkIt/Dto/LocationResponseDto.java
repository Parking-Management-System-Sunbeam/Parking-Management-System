package com.ParkIt.Dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ParkIt.Entities.Feedback;
import com.ParkIt.Entities.Location;
import com.ParkIt.Entities.VehicleType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class LocationResponseDto {

	private Long id;
    private String location_name;
    private String pincode;
    private Integer price;
    private String image;
    private String description;
    private List<SlotResponseDto> slots;
    private List<VehicleType> vehicleTypes;
    
    private Double avgRating;
    
    public LocationResponseDto(Location location) {
        this.id = location.getId();
        this.location_name = location.getLocationName();
        this.pincode = location.getPincode();
        this.price = location.getPrice();
        this.image = location.getImage();
        this.description = location.getDescription();
        this.vehicleTypes = location.getVehicleTypes();
        this.slots = location.getSlots()
                .stream()
                .map(slot -> new SlotResponseDto(
                    slot.getId(),
                    slot.getSlotName(),
                    slot.isAvailable()
                ))
                .collect(Collectors.toList());
        
        if (location.getFeedbacks() != null && !location.getFeedbacks().isEmpty()) {
            this.avgRating = location.getFeedbacks()
                .stream()
                .mapToInt(Feedback::getRating)
                .average()
                .orElse(0.0);
        } else {
            this.avgRating = 0.0;
        }
    }
}
