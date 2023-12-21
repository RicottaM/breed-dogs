package com.example.Dogs;

import com.example.Dogs.Config.CommonCorsConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(CommonCorsConfig.class)
public class DogsServer {

	public static void main(String[] args) {
		SpringApplication.run(DogsServer.class, args);
	}

}
