package com.jub.hub.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CvService {

    private final WebClient pdfGeneratorClient;

    @SuppressWarnings("unchecked")
    public Flux<Map<String, Object>> getAllCvs() {
        return pdfGeneratorClient.get()
                .uri("/cvs")
                .retrieve()
                .onStatus(status -> status.is4xxClientError(),
                        response -> Mono.error(new ResponseStatusException(HttpStatus.BAD_GATEWAY, "pdf_generator error")))
                .bodyToFlux(Map.class)
                .cast(Map.class)
                .map(m -> (Map<String, Object>) m)
                .doOnError(e -> log.error("Error fetching all CVs: {}", e.getMessage()));
    }

    @SuppressWarnings("unchecked")
    public Mono<Map<String, Object>> getCvByUid(String uid) {
        return pdfGeneratorClient.get()
                .uri("/cvs/{uid}", uid)
                .retrieve()
                .onStatus(status -> status.value() == 404,
                        response -> Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "CV not found")))
                .onStatus(status -> status.is4xxClientError(),
                        response -> Mono.error(new ResponseStatusException(HttpStatus.BAD_GATEWAY, "pdf_generator error")))
                .bodyToMono(Map.class)
                .cast(Map.class)
                .map(m -> (Map<String, Object>) m)
                .doOnError(e -> log.error("Error fetching CV for {}: {}", uid, e.getMessage()));
    }
}
