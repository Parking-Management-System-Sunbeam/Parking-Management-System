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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	 
	 @Column(name = "slot_name", nullable = false, unique = true)
	 private String slotName;
	 
	 @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "location_id")
	    private Location location;
	 
	 @Column(name = "is_available")
	    private boolean isAvailable = true;
	 
	    public Slot(String slot_name, Location location) {
	        this.slotName = slot_name;
	        this.location = location;
	        this.isAvailable = true;
	    }
}
