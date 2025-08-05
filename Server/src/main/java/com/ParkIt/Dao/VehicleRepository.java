package com.ParkIt.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long>{

}
