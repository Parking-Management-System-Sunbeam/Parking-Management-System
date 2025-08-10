	package com.ParkIt.config;
	
	import org.springframework.context.annotation.Configuration;
	import org.springframework.web.servlet.config.annotation.CorsRegistry;
	import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
	
	@Configuration
	public class WebConfig implements WebMvcConfigurer {

	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	            // specify origins explicitly or use patterns
	            .allowedOrigins("http://localhost:5173")
	            // or:
	            //.allowedOriginPatterns("http://localhost:5173")
	            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
	            .allowedHeaders("*")
	            .allowCredentials(true);
	    }
	}

