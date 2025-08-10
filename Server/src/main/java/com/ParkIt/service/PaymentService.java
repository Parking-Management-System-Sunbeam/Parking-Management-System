package com.ParkIt.service;

import java.util.List;

import com.ParkIt.Dto.MonthlyIncomeDto;
import com.ParkIt.Dto.PaymentResDto;
import com.ParkIt.Dto.YearlyIncomeDto;

public interface PaymentService {

	// Get all payments
	List<PaymentResDto> getAllPayments();
	
	// get all payments by monthly for location id 
	List<MonthlyIncomeDto> getMonthlyIncomeByLocation(Long locationId);
	
	// get all payments by yearly for location id
	List<YearlyIncomeDto> getYearlyIncomeByLocation(Long locationId);
}
