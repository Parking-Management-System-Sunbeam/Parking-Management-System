package com.ParkIt.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.Payment;

public interface PaymentDao extends JpaRepository<Payment, Long> {

}
