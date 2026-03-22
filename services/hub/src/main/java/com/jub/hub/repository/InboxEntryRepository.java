package com.jub.hub.repository;

import com.jub.hub.models.InboxEntry;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface InboxEntryRepository extends ReactiveCrudRepository<InboxEntry, Long> {
    Flux<InboxEntry> findByReceiverId(String receiverId);
    Flux<InboxEntry> findBySenderId(String senderId);
}
