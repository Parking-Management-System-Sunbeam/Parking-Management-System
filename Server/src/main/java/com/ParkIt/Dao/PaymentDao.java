package com.ParkIt.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ParkIt.Entities.Payment;

public interface PaymentDao extends JpaRepository<Payment, Long> {

	@Query("SELECT FUNCTION('MONTHNAME', p.paymentDate) AS month, SUM(p.amount) AS totalIncome " +
		       "FROM Payment p " +
		       "WHERE p.paymentStatus = 'CONFIRMED' AND p.booking.locationId.id = :locationId " +
		       "GROUP BY FUNCTION('MONTH', p.paymentDate), FUNCTION('MONTHNAME', p.paymentDate) " +
		       "ORDER BY FUNCTION('MONTH', p.paymentDate)")
		List<Object[]> getMonthlyIncomeByLocation(@Param("locationId") Long locationId);
		
		@Query("SELECT FUNCTION('YEAR', p.paymentDate) AS year, SUM(p.amount) AS totalIncome " +
			       "FROM Payment p " +
			       "WHERE p.paymentStatus = 'CONFIRMED' AND p.booking.locationId.id = :locationId " +
			       "GROUP BY FUNCTION('YEAR', p.paymentDate) " +
			       "ORDER BY FUNCTION('YEAR', p.paymentDate)")
			List<Object[]> getYearlyIncomeByLocation(@Param("locationId") Long locationId);
}
