package com.ParkIt.Dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResDto {
    private Long id;
    private Double amount;
    private String paymentMode;
    private String paymentStatus;
    private LocalDateTime paymentDate;

    private Long bookingId;
    private Long userId;
    private String userName;
}