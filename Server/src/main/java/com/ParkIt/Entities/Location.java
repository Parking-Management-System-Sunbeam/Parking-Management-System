package com.ParkIt.Entities;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Location extends  BaseEntity {
	@Column(name = "location_name", nullable = false, length = 50)
	private String locationName;
	 @Column(name = "pincode", nullable = false, length = 10)
	private String pincode;
	 @Column(name = "price", nullable = false)
	private int price;	
	 @Column(name = "image",length = 30)
	private String image;
	 
	 @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
	 private List<Slot> slots = new ArrayList<>();
     
	 @ElementCollection(fetch = FetchType.EAGER)
	    @Enumerated(EnumType.STRING)
	    @CollectionTable(name = "location_vehicle_types", joinColumns = @JoinColumn(name = "location_id"))
	    @Column(name = "vehicle_type")
	    private List<VehicleType> vehicleTypes = new ArrayList<>();
	 
	 @Column(name = "location_detail", nullable = false, length = 100)
	    private String description;
	 
	 public void addSlot(Slot slot) {
		    slot.setLocation(this);     
		    this.slots.add(slot);         
		}
	 public void clearSlots() {
		    for (Slot slot : slots) {
		        slot.setLocation(null);
		    }
		    slots.clear();
		}
}

