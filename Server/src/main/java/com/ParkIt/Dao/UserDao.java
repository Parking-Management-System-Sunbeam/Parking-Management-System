package com.ParkIt.Dao;
import com.ParkIt.Entities.User;
import com.ParkIt.Entities.UserRole;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface UserDao extends JpaRepository<User, Long>{
	
	boolean existsByEmail(String email);
	
	Optional<User> findById(Long id);
	Optional<User> findByEmail(String email);
//	 List<User> findByIsDeletedFalse();
	List<User> findByUserRole(UserRole userRole);
}
