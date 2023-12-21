package com.example.Breeds;

import com.example.Breeds.Config.CommonCorsConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(CommonCorsConfig.class)
public class BreedsServer {

	public static void main(String[] args) {
		SpringApplication.run(BreedsServer.class, args);
	}

}
