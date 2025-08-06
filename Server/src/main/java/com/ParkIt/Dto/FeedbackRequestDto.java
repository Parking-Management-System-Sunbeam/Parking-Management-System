package com.ParkIt.Dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedbackRequestDto {
	
	private Long id;
	
	@NotNull(message="Location id required")
	private Long locationId;
	
	private String message;
	
	@NotNull(message = "Rating is required")
	@Min(value = 1, message = "Rating must be greater than 0")
    @Max(value = 5, message = "Rating must be less than or equal to 5")
	private int rating;
	
}
