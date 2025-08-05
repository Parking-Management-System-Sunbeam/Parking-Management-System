package com.ParkIt.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ParkIt.Entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
