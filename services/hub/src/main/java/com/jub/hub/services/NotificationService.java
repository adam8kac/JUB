package com.jub.hub.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Slf4j
@Service
public class NotificationService {

    private final ConcurrentMap<String, Sinks.Many<ServerSentEvent<String>>> sinks = new ConcurrentHashMap<>();

    public Flux<ServerSentEvent<String>> subscribe(String userId) {
        Sinks.Many<ServerSentEvent<String>> sink = sinks.computeIfAbsent(
                userId,
                uid -> Sinks.many().multicast().onBackpressureBuffer()
        );
        ServerSentEvent<String> connected = ServerSentEvent.<String>builder()
                .event("connected")
                .data("{\"type\":\"connected\",\"userId\":\"" + userId + "\"}")
                .build();
        return Flux.concat(
                Flux.just(connected),
                sink.asFlux()
        ).doFinally(signal -> {
            log.debug("SSE connection closed for user {}: {}", userId, signal);
            sinks.remove(userId);
        });
    }

    public void notify(String userId, String message) {
        Sinks.Many<ServerSentEvent<String>> sink = sinks.get(userId);
        if (sink != null) {
            ServerSentEvent<String> event = ServerSentEvent.<String>builder()
                    .data(message)
                    .build();
            Sinks.EmitResult result = sink.tryEmitNext(event);
            if (result.isFailure()) {
                log.warn("Failed to emit notification to user {}: {}", userId, result);
            }
        } else {
            log.debug("No active SSE subscriber for user {}", userId);
        }
    }
}
