package com.ParkIt.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.Vehicle;

public interface VehicleDao extends  JpaRepository<Vehicle, Long>{
	  boolean existsByLicensePlate(String licensePlate);
//	boolean existsByLicensePlateAndUser_Id(String licensePlate, Long userId);

}
	