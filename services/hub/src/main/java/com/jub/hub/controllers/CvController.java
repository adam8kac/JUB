package com.jub.hub.controllers;

import com.jub.hub.security.JwtFilter;
import com.jub.hub.services.CvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/cvs")
@RequiredArgsConstructor
public class CvController {

    private final CvService cvService;

    @GetMapping
    public Flux<Map<String, Object>> getAllCvs(ServerWebExchange exchange) {
        return requireAuth(exchange)
                .thenMany(cvService.getAllCvs());
    }

    @GetMapping("/{uid}")
    public Mono<Map<String, Object>> getCv(@PathVariable String uid, ServerWebExchange exchange) {
        return requireAuth(exchange)
                .then(cvService.getCvByUid(uid));
    }

    private Mono<Void> requireAuth(ServerWebExchange exchange) {
        String uid = (String) exchange.getAttributes().get(JwtFilter.UID_ATTRIBUTE);
        if (uid == null) {
            return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required"));
        }
        return Mono.empty();
    }
}
