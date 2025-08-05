package com.ParkIt.Dao;
import com.ParkIt.Entities.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long>{
	
	boolean existsByEmail(String email);
	
	Optional<User> findByEmail(String email);

}
