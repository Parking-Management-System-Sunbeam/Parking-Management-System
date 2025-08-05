package com.ParkIt.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SlotResponseDto {

	 private Long id;
	    private String slotName;
	    private boolean isAvailable;
}
