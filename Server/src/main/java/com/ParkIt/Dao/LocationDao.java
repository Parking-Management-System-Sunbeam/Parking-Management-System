package com.ParkIt.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.Location;

public interface LocationDao extends JpaRepository<Location, Long> {
	
	
	List<Location> findByPincode(String pincode);
	

}
