package com.ParkIt.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.Feedback;

public interface FeedbackDao extends JpaRepository<Feedback, Long> {
	Optional<Feedback> findById(Long id);
	List<Feedback> findByLocationId(Long locationId);
    boolean existsByIdAndUserId(Long feedbackId, Long userId);

}
