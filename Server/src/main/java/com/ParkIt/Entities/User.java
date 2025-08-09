package com.ParkIt.Entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor

@ToString
public class User extends BaseEntity{

	@Column(length = 30, name = "user_name")
	private String userName;
	@Column(length = 30, unique = true) 
	private String email;
	@Column(length = 500, nullable = false) 
	private String password;
	@Enumerated(EnumType.STRING) 
	@Column(length = 30, name = "user_role")
	private UserRole userRole;
	@Column(length = 20, nullable = false) 
	private String phone;
	@Column(length = 50 ) 
	private String img;
	
//	 private boolean isDeleted = false;

	
	@OneToMany(mappedBy = "user" , cascade =  CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Vehicle> vehicles = new ArrayList<>();
	
	//helpers
	
//	 public void addVehicle(Vehicle vehicle) {
//		 vehicle.setUser(this);     
//		    this.vehicles.add(vehicle);         
//		}
//	 public void removeVehicle(Vehicle vehicle) {
//		
//		 vehicle.setUser(null);
//		    
//		    vehicles.clear();
//		}
	
//	@OneToMany(cascade = CascadeType.ALL)
//	private List<Location> locations =new ArrayList<>();
//	
//	 public void addLocation(Location location) {
//	        locations.add(location);
//	    }
	

}

