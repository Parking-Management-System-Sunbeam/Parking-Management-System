package com.ParkIt.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.Location;

public interface LocationDao extends JpaRepository<Location, Long> {
	
	

}
