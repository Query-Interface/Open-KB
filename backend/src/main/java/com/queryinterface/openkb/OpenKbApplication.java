package com.queryinterface.openkb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration;

@SpringBootApplication(proxyBeanMethods = false, exclude = SpringDataWebAutoConfiguration.class)
public class OpenKbApplication {

	public static void main(String[] args) {
		SpringApplication.run(OpenKbApplication.class, args);
	}

}
