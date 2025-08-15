package com.ParkIt.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkIt.Dto.MonthlyIncomeDto;
import com.ParkIt.Dto.PaymentResDto;
import com.ParkIt.Dto.YearlyIncomeDto;
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

	    // Get monthly income by location id
	    
	    @GetMapping("/income/monthly/{locationId}")
	    public ResponseEntity<List<MonthlyIncomeDto>> getMonthlyIncomeByLocation(@PathVariable Long locationId) {
	        List<MonthlyIncomeDto> incomeList = paymentService.getMonthlyIncomeByLocation(locationId);
	        return ResponseEntity.ok(incomeList);
	    }
	    
	 // Get yearly income by location id
	    
	    @GetMapping("/income/yearly/{locationId}")
	    public ResponseEntity<List<YearlyIncomeDto>> getYearlyIncomeByLocation(@PathVariable Long locationId) {
	        List<YearlyIncomeDto> incomeList = paymentService.getYearlyIncomeByLocation(locationId);
	        return ResponseEntity.ok(incomeList);
	    }
}
