package com.ParkIt.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")

public class DemoController {
	
	@GetMapping
	public String demo() {
		return "demo";
	}
}
