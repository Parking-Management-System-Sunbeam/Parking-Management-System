package com.ParkIt.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.ParkIt.Dao.PaymentDao;
import com.ParkIt.Dto.PaymentResDto;
import com.ParkIt.Entities.Booking;
import com.ParkIt.Entities.Payment;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	 private final PaymentDao paymentRepository;
	    private final ModelMapper modelMapper;
	
	@Override
	public List<PaymentResDto> getAllPayments() {
		 List<Payment> payments = paymentRepository.findAll();

	        return payments.stream().map(payment -> convertPaymentToPaymentResDto(payment))
	        		.collect(Collectors.toList());
	}
	// helper method
	 private PaymentResDto convertPaymentToPaymentResDto(Payment payment) {
		 PaymentResDto dto = new PaymentResDto();
	        dto.setId(payment.getId());
	        dto.setAmount(payment.getAmount());
	        dto.setPaymentMode(payment.getPaymentMode());
	        dto.setPaymentStatus(payment.getPaymentStatus());
	        dto.setPaymentDate(payment.getPaymentDate());

	        Booking booking = payment.getBooking();
	        dto.setBookingId(booking.getId());
	        dto.setUserId(booking.getUserId().getId());
	        dto.setUserName(booking.getUserId().getUserName());

	        return dto;
	    }

}
