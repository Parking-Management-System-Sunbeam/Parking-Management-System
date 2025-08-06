package com.ParkIt.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.FeedbackDao;
import com.ParkIt.Dao.LocationDao;
import com.ParkIt.Dao.UserDao;
import com.ParkIt.Dto.ApiResponse;
import com.ParkIt.Dto.FeedbackRequestDto;
import com.ParkIt.Dto.FeedbackResponseDto;
import com.ParkIt.Entities.Feedback;
import com.ParkIt.Entities.Location;
import com.ParkIt.Entities.User;
import com.ParkIt.Entities.UserRole;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {
	private final ModelMapper mapper;
	private final  FeedbackDao feedbackRepo;
	private final  UserDao userRepo;
	private final  LocationDao locationRepo;
	

	 @Override
	    public ApiResponse addFeedback(Long userId, FeedbackRequestDto dto) {
	        Optional<User> userOpt = userRepo.findById(userId);
	        Optional<Location> locOpt = locationRepo.findById(dto.getLocationId());

	        if (userOpt.isEmpty() || locOpt.isEmpty()) {
	            return new ApiResponse("User or Location not found");
	        }

	        Feedback feedback = mapper.map(dto, Feedback.class);
	        feedback.setUser(userOpt.get());
	        feedback.setLocation(locOpt.get());

	        feedbackRepo.save(feedback);

	        updateAverageRating(locOpt.get());

	        return new ApiResponse("Feedback added successfully");
	    }

	  @Override
	    public ApiResponse editFeedback(Long userId, FeedbackRequestDto dto) {
	        Optional<Feedback> feedbackOpt = feedbackRepo.findById(dto.getId());
	        if (feedbackOpt.isEmpty()) return new ApiResponse("Feedback not found");

	        Feedback feedback = feedbackOpt.get();
	        if (!feedback.getUser().getId().equals(userId)) {
	            return new ApiResponse("Not authorized");
	        }

	        feedback.setRating(dto.getRating());
	        feedback.setMessage(dto.getMessage());

	        feedbackRepo.save(feedback);
	        updateAverageRating(feedback.getLocation());

	        return new ApiResponse("Feedback updated");
	    }

	  @Override
	    public ApiResponse deleteFeedback(Long userId, Long feedbackId) {
	        Optional<Feedback> feedbackOpt = feedbackRepo.findById(feedbackId);
	        if (feedbackOpt.isEmpty()) return new ApiResponse("Feedback not found");

	        Feedback feedback = feedbackOpt.get();
	        
	        User requestingUser = userRepo.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        boolean isOwner = feedback.getUser().getId().equals(userId);
	        
	        
	        boolean isAdmin = requestingUser.getUserRole() == UserRole.ADMIN;
	        boolean isLocationAdmin = isAdmin && 
	                feedback.getLocation().getUser().getId().equals(userId); 
	        if (!isOwner && !isLocationAdmin) {
	            return new ApiResponse("You don't have permission to delete this feedback");
	        }

	        feedbackRepo.delete(feedback);
	        updateAverageRating(feedback.getLocation());

	        return new ApiResponse("Feedback deleted successfully");
	    }

	    @Override
	    public List<FeedbackResponseDto> getFeeback(Long locationId) {
	        return feedbackRepo.findByLocationId(locationId).stream()
	                .map(fb -> {
	                    FeedbackResponseDto dto = mapper.map(fb, FeedbackResponseDto.class);
	                    dto.setUserName(fb.getUser().getUserName());
	                    return dto;
	                })
	                .collect(Collectors.toList());
	    }

	
	//helper
	 private void updateAverageRating(Location location) {
		 List<Feedback> feedbacks = feedbackRepo.findByLocationId(location.getId());

		    int total = feedbacks.stream().mapToInt(Feedback::getRating).sum();
		    int count = feedbacks.size();
		    double avg = count > 0 ? (double) total / count : 0.0;

		    location.setAverageRating(avg);
		    location.setRatingCount(count);
		    locationRepo.save(location);
	    }
}
