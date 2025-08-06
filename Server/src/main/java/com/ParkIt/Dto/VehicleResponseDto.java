package com.ParkIt.Dto;

import com.ParkIt.Entities.UserRole;
import com.ParkIt.Entities.VehicleType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class VehicleResponseDto {
    private Long id;
    private String licensePlate;
    private VehicleType vehicleType;
    private Long userId;
}
