package com.ParkIt.service;

import java.util.List;

import com.ParkIt.Dto.PaymentResDto;

public interface PaymentService {

	// Get all payment service
	List<PaymentResDto> getAllPayments();
}
