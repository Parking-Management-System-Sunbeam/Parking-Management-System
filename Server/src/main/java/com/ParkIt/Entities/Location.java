package com.ParkIt.Entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
	@Column(name = "location_name", nullable = false, length = 100)
	private String location_name;
	 @Column(name = "pincode", nullable = false, length = 10)
	private String pincode;
	 @Column(name = "price", nullable = false)
	private int price;	
	 @Column(name = "image",length = 30)
	private String image;


    
     
}

