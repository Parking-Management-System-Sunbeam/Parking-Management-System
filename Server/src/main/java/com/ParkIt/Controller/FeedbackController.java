package com.ParkIt.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.FeedbackRequestDto;
import com.ParkIt.Dto.FeedbackResponseDto;
import com.ParkIt.service.FeedbackService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/feedback")
public class FeedbackController {

	 private final FeedbackService feedbackService;

	    // ➕ Add Feedback
	    @PostMapping("/{userId}")
	    public ResponseEntity<ApiResponse> addFeedback(
	            @PathVariable Long userId,
	            @RequestBody @Valid FeedbackRequestDto dto) {
	        ApiResponse response = feedbackService.addFeedback(userId, dto);
	        return ResponseEntity.ok(response);
	    }

	    // ✏️ Edit Feedback
	    @PutMapping("/{userId}")
	    public ResponseEntity<ApiResponse> editFeedback(
	            @PathVariable Long userId,
	            @RequestBody @Valid FeedbackRequestDto dto) {
	        ApiResponse response = feedbackService.editFeedback(userId, dto);
	        return ResponseEntity.ok(response);
	    }

	    // ❌ Delete Feedback
	    @DeleteMapping("/{userId}/{feedbackId}")
	    public ResponseEntity<ApiResponse> deleteFeedback(
	            @PathVariable Long userId,
	            @PathVariable Long feedbackId) {
	        ApiResponse response = feedbackService.deleteFeedback(userId, feedbackId);
	        return ResponseEntity.ok(response);
	    }

	    // 📄 Get All Feedback for a Location
	    @GetMapping("/location/{locationId}")
	    public ResponseEntity<List<FeedbackResponseDto>> getFeedbacks(
	            @PathVariable Long locationId) {
	        List<FeedbackResponseDto> list = feedbackService.getFeeback(locationId);
	        return ResponseEntity.ok(list);
	    }
}
