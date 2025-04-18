package com.config.config_servise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class ConfigServiseApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigServiseApplication.class, args);
	}

}
