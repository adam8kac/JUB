package com.jub.hub.controllers;

import com.jub.hub.security.JwtFilter;
import com.jub.hub.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/stream/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> stream(@PathVariable String userId,
                                                ServerWebExchange exchange) {
        return getUid(exchange)
                .flatMapMany(uid -> {
                    if (!uid.equals(userId)) {
                        return Flux.error(new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot subscribe to another user's stream"));
                    }
                    return notificationService.subscribe(userId);
                });
    }

    private Mono<String> getUid(ServerWebExchange exchange) {
        String uid = (String) exchange.getAttributes().get(JwtFilter.UID_ATTRIBUTE);
        if (uid == null) {
            return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required"));
        }
        return Mono.just(uid);
    }
}
