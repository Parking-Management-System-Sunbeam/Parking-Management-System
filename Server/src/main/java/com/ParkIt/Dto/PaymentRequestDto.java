package com.ParkIt.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentRequestDto {
	
	@NotNull(message = "Payment amount is required")
    private Double amount;

    @NotBlank(message = "Payment Mode is required")
    private String paymentMode;
}
