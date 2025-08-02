package com.ParkIt.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ParkIt.Dao.LocationDao;
import com.ParkIt.Dao.UserDao;
import com.ParkIt.Dto.LocationRequestDto;
import com.ParkIt.Dto.LocationResponseDto;
import com.ParkIt.Entities.User;
import com.ParkIt.GlobalExceptionHandler.AlreadyExistsException;

import lombok.AllArgsConstructor;
import com.ParkIt.Entities.Location;

@Service
@Transactional
@AllArgsConstructor
public class LocationServiceImpl implements LocationService{

	private ModelMapper mapper;
	private LocationDao locationDao;
	private UserDao userDao;
	@Override
	public LocationResponseDto createLocation(LocationRequestDto dto, Long userId) {
		
		User user=userDao.findById(userId).orElseThrow(()->new AlreadyExistsException("User is not found with this id"));
		return null;
	}

	@Override
	public LocationResponseDto updateLocation(Long locationId, LocationRequestDto dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteLocation(Long locationId) {
		// TODO Auto-generated method stub
		
	}

	

}
