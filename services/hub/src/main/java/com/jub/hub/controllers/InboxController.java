package com.jub.hub.controllers;

import com.jub.hub.dto.InboxEntryRequest;
import com.jub.hub.models.InboxEntry;
import com.jub.hub.security.JwtFilter;
import com.jub.hub.services.InboxService;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class InboxController {

    private final InboxService inboxService;

    @PostMapping("/requests")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<InboxEntry> sendRequest(@RequestBody @Valid InboxEntryRequest request,
                                        ServerWebExchange exchange) {
        return getUid(exchange)
                .flatMap(uid -> inboxService.sendRequest(uid, request));
    }

    @GetMapping("/inbox/{userId}")
    public Flux<InboxEntry> getInbox(@PathVariable String userId, ServerWebExchange exchange) {
        return getUid(exchange)
                .flatMapMany(uid -> {
                    if (!uid.equals(userId)) {
                        return Flux.error(new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot access another user's inbox"));
                    }
                    return inboxService.getInbox(userId);
                });
    }

    @PatchMapping("/requests/{id}")
    public Mono<InboxEntry> respond(@PathVariable Long id,
                                    @RequestBody AcceptDeclineRequest body,
                                    ServerWebExchange exchange) {
        return getUid(exchange)
                .flatMap(uid -> inboxService.respond(id, uid, body.getAccepted()));
    }

    private Mono<String> getUid(ServerWebExchange exchange) {
        String uid = (String) exchange.getAttributes().get(JwtFilter.UID_ATTRIBUTE);
        if (uid == null) {
            return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required"));
        }
        return Mono.just(uid);
    }

    @Data
    static class AcceptDeclineRequest {
        private Boolean accepted;
    }
}
