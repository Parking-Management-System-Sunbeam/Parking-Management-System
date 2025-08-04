package com.ParkIt.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.Location;

public interface LocationDao extends JpaRepository<Location, Long> {
	
	boolean existsByLocationName(String name);
	List<Location> findByPincode(String pincode);
	
	List<Location> findByLocationNameContainingIgnoreCase(String name);
}
