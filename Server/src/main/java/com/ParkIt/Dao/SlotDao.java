package com.ParkIt.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.Slot;

public interface SlotDao extends JpaRepository<Slot, Long> {
	// find slot by location from slots table
	List<Slot> findByLocationId(Long locationId);
}
