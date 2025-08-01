package com.ParkIt.Entities;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends BaseEntity{

	//booking id 
	
	@Column(name = "Amount", nullable = false, precision = 10, scale = 2)
	private BigDecimal amount;
	
	@Column(name = "Payment_Method", nullable = false, length = 50)
	private String paymentMethod;
	
}
