package com.ParkIt.Dto;

import java.time.LocalDateTime;

import com.ParkIt.Entities.BookingStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookinngResDto {
	 private Long id;

//	    private Long userId;
	    private String userName;

//	    private Long slotId;
	    private String slotName;

//	    private Long locationId;
	    private String locationName;

	    private LocalDateTime startTime;
	    private LocalDateTime endTime;

	    private BookingStatus status;

	    private String licenseNumber;
}
