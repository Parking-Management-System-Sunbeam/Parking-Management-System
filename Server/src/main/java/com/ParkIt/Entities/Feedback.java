package com.ParkIt.Entities;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity (name = "feedbacks")
@Getter
@Setter
@NoArgsConstructor
@ToString

public class Feedback extends BaseEntity {
	
	@Column(length = 100)
	private String message;
	
	@Column(name ="rating", nullable = false)
	private int rating;
	
	
	@ManyToOne(fetch = FetchType.LAZY) 
	@JoinColumn(name = "user_id")
	private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;
}
