package com.ParkIt.service;

import java.util.List;

import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.FeedbackRequestDto;
import com.ParkIt.Dto.FeedbackResponseDto;

public interface FeedbackService {
	
	ApiResponse addFeedback(Long userId , FeedbackRequestDto  dto);
	ApiResponse editFeedback(Long userId , FeedbackRequestDto  dto);
	ApiResponse deleteFeedback(Long userd, Long feedbackId);
	List<FeedbackResponseDto> getFeeback(Long locationId);
	
}
