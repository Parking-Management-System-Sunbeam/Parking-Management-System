package com.ParkIt.Entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payment")
@Getter
@Setter
@NoArgsConstructor
public class Payment {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "payment_id")
	 	private Long id;
	 
	 @Column(name = "amount", nullable = false)
	    private double amount;
	 
	 @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "booking_id", nullable = false)
	  	private Booking booking;
	 
	 @Column(name = "payment_mode", nullable = false, length = 50)
	 	private String paymentMode = "UPI";
	 
	 @Column(name = "payment_status", nullable = false, length = 20)
	    private String paymentStatus; 
	 
	 @Column(name = "payment_date")
	    private LocalDateTime paymentDate; 
}
