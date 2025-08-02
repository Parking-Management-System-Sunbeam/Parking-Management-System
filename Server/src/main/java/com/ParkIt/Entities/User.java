package com.ParkIt.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor

@ToString
public class User extends BaseEntity{

	@Column(length = 20, name = "first_name")
	private String firstName;
	@Column(length = 30, name = "last_name")
	private String lastName;
	@Column(length = 30, unique = true) 
	private String email;
	@Column(length = 20, nullable = false) 
	private String password;
	@Enumerated(EnumType.STRING) 
	@Column(length = 30, name = "user_role")
	private UserRole userRole;
	@Column(length = 20, nullable = false) 
	private String phone;
	@Column(length = 50 ) 
	private String img;
	
}
