package com.ParkIt.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedbackResponseDto {
	
	//feeback id
		private Long id;
		
		private Long userId;
		
		private String image;
		
		private String userName;
		
		private Long locationId;
		
		private String message;
		
		private int rating;
	
}
