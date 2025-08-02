package com.ParkIt.Entities;

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

	private String location_name;
	private String pincode;
	private int price;	
	private String image;
}
