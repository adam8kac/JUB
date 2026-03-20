package com.jub.hub.services;

import com.jub.hub.dto.InboxEntryRequest;
import com.jub.hub.models.InboxEntry;
import com.jub.hub.repository.InboxEntryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class InboxService {

    private final InboxEntryRepository repository;
    private final NotificationService notificationService;

    public Mono<InboxEntry> sendRequest(String senderUid, InboxEntryRequest req) {
        InboxEntry entry = new InboxEntry();
        entry.setSenderId(senderUid);
        entry.setReceiverId(req.getReceiverId());
        entry.setJobPostingId(req.getJobPostingId());
        entry.setSenderType(req.getSenderType());
        entry.setMessage(req.getMessage());
        entry.setIsAccepted(null);
        entry.setCreatedAt(Instant.now());
        return repository.save(entry)
                .doOnSuccess(e -> {
                    log.info("Inbox request {} sent from {} to {}", e.getId(), senderUid, req.getReceiverId());
                    notificationService.notify(
                            e.getReceiverId(),
                            String.format("{\"type\":\"NEW_REQUEST\",\"requestId\":%d,\"senderId\":\"%s\",\"senderType\":\"%s\"}",
                                    e.getId(), e.getSenderId(), e.getSenderType())
                    );
                });
    }

    public Flux<InboxEntry> getInbox(String userId) {
        return repository.findByReceiverId(userId)
                .doOnError(e -> log.error("Error fetching inbox for {}: {}", userId, e.getMessage()));
    }

    public Mono<InboxEntry> respond(Long id, String receiverUid, Boolean accepted) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found")))
                .flatMap(entry -> {
                    if (!receiverUid.equals(entry.getReceiverId())) {
                        return Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your request"));
                    }
                    entry.setIsAccepted(accepted);
                    return repository.save(entry);
                })
                .doOnSuccess(entry -> {
                    String status = Boolean.TRUE.equals(accepted) ? "accepted" : "declined";
                    notificationService.notify(
                            entry.getSenderId(),
                            String.format("{\"requestId\":%d,\"status\":\"%s\"}", entry.getId(), status)
                    );
                    log.info("Request {} {} by {}", id, status, receiverUid);
                })
                .doOnError(e -> log.error("Error responding to request {}: {}", id, e.getMessage()));
    }
}
