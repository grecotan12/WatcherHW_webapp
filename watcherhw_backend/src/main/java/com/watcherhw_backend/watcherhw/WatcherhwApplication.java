package com.watcherhw_backend.watcherhw;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.watcherhw_backend.watcherhw.service.GetHardwareService;

@SpringBootApplication
public class WatcherhwApplication {

	@Autowired
	public static GetHardwareService getHardwareService;

	public static void main(String[] args) {
		SpringApplication.run(WatcherhwApplication.class, args);
	}
}
