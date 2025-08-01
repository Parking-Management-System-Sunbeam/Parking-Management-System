package com.ParkIt.Entities;

import java.time.LocalDateTime;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "Rating")
@AllArgsConstructor
@NoArgsConstructor
public class Rating extends BaseEntity {

	
	@Column(nullable = false)
	private int rating;
	@Column(length = 500)
	private String comment;
	
	 @ManyToOne
	 @JoinColumn(name = "user_id")
	 private User user;
	 /*
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
    */
	
}
