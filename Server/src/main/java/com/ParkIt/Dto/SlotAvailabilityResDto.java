package com.ParkIt.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SlotAvailabilityResDto {
	private Long id;
    private String slotName;
    private boolean available;
    private Long locationId;
}
