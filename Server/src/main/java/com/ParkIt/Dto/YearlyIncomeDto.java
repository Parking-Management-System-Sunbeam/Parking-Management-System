package com.ParkIt.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class YearlyIncomeDto {
    private Integer year;
    private Double totalIncome;
}	