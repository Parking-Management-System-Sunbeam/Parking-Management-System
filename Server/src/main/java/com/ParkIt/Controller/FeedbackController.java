package com.ParkIt.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.FeedbackRequestDto;
import com.ParkIt.service.BookingService;
import com.ParkIt.service.FeedbackService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/feedback")
public class FeedbackController {

	private final FeedbackService feedbackService;
	
	@PostMapping("/add/{id}")
	
	public ResponseEntity<?> addFeedback(@PathVariable Long id,@RequestBody @Valid FeedbackRequestDto dto){
		
		
		
		return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.addFeedback(id, dto));
				
	}
	
}
