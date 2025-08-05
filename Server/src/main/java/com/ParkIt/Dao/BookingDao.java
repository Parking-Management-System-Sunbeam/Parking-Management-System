package com.ParkIt.Dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ParkIt.Entities.Booking;
import com.ParkIt.Entities.BookingStatus;

public interface BookingDao  extends JpaRepository<Booking, Long>{

	 @Query("SELECT b.slotId.id FROM Booking b WHERE b.slotId.location.id = :locationId " +
	           "AND b.status = :status  " +
	           "AND ((:startTime < b.endTime AND :endTime > b.startTime))")
	    List<Long> findBookedSlotIds(
	        @Param("locationId") Long locationId,
	        @Param("startTime") LocalDateTime startTime,
	        @Param("endTime") LocalDateTime endTime,
	        @Param("status") BookingStatus status
	    );
	 
	 List<Booking> findByUserId_Id(Long userId);
	 
	 List<Booking> findByStatus(BookingStatus status);
}
