package com.ParkIt.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.Booking;
import com.ParkIt.Entities.User;

public interface BookingRepository extends JpaRepository<Booking, Long>{

	List<Booking> findByUser(User user);

}
