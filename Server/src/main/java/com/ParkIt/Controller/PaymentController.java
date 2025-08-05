package com.ParkIt.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.PaymentResDto;
import com.ParkIt.service.PaymentService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/payment")
public class PaymentController {
	
	 private final PaymentService paymentService;

	 	// Get All Payment history
	 
	    @GetMapping("/getall")
	    public ResponseEntity<List<PaymentResDto>> getAllPayments() {
	        List<PaymentResDto> payments = paymentService.getAllPayments();
	        return ResponseEntity.ok(payments);
	    }

}
