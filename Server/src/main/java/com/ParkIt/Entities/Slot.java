package com.ParkIt.Entities;

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
@Table(name = "slot")
@Getter
@Setter
@NoArgsConstructor
public class Slot {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "slot_id")
	    private Long id;
	 
	 @Column(name = "slot_name", nullable = false, unique = true)
	 private String slot_name;
	 
	 @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "location_id")
	    private Location location;
	 
	 @Column(name = "is_available")
	    private boolean isAvailable;
}
