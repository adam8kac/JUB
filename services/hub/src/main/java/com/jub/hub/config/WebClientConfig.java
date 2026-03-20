package com.jub.hub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${pdf-generator.base-url:http://localhost:3001}")
    private String pdfGeneratorBaseUrl;

    @Bean
    public WebClient pdfGeneratorClient() {
        return WebClient.builder()
                .baseUrl(pdfGeneratorBaseUrl)
                .build();
    }
}
