package com.jub.hub.services;

import com.jub.hub.dto.InboxEntryRequest;
import com.jub.hub.models.InboxEntry;
import com.jub.hub.repository.InboxEntryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InboxServiceTest {

    @Mock
    private InboxEntryRepository repository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private InboxService service;

    private InboxEntry entry;
    private InboxEntryRequest request;

    @BeforeEach
    void setUp() {
        entry = new InboxEntry();
        entry.setId(1L);
        entry.setSenderId("sender-uid");
        entry.setReceiverId("receiver-uid");
        entry.setJobPostingId(10L);
        entry.setSenderType("EMPLOYER");
        entry.setMessage("Interested in your profile");
        entry.setIsAccepted(null);

        request = new InboxEntryRequest();
        request.setReceiverId("receiver-uid");
        request.setJobPostingId(10L);
        request.setSenderType("EMPLOYER");
        request.setMessage("Interested in your profile");
    }

    // --- sendRequest ---

    @Test
    void sendRequest_validRequest_savesEntry() {
        when(repository.save(any(InboxEntry.class))).thenReturn(Mono.just(entry));
        doNothing().when(notificationService).notify(anyString(), anyString());

        StepVerifier.create(service.sendRequest("sender-uid", request))
                .assertNext(saved -> {
                    assertThat(saved.getId()).isEqualTo(1L);
                    assertThat(saved.getSenderId()).isEqualTo("sender-uid");
                    assertThat(saved.getReceiverId()).isEqualTo("receiver-uid");
                })
                .verifyComplete();

        verify(repository).save(any(InboxEntry.class));
    }

    @Test
    void sendRequest_notifiesReceiver() {
        when(repository.save(any(InboxEntry.class))).thenReturn(Mono.just(entry));
        doNothing().when(notificationService).notify(anyString(), anyString());

        StepVerifier.create(service.sendRequest("sender-uid", request))
                .expectNextCount(1)
                .verifyComplete();

        verify(notificationService).notify(eq("receiver-uid"), anyString());
    }

    @Test
    void sendRequest_setsIsAcceptedToNull() {
        when(repository.save(any(InboxEntry.class))).thenAnswer(inv -> {
            InboxEntry e = inv.getArgument(0);
            assertThat(e.getIsAccepted()).isNull();
            e.setId(1L);
            return Mono.just(e);
        });
        doNothing().when(notificationService).notify(anyString(), anyString());

        StepVerifier.create(service.sendRequest("sender-uid", request))
                .expectNextCount(1)
                .verifyComplete();
    }

    // --- getInbox ---

    @Test
    void getInbox_returnsEntriesForUser() {
        InboxEntry entry2 = new InboxEntry();
        entry2.setId(2L);
        entry2.setReceiverId("receiver-uid");

        when(repository.findByReceiverId("receiver-uid")).thenReturn(Flux.just(entry, entry2));
        when(repository.findBySenderId("receiver-uid")).thenReturn(Flux.empty());

        StepVerifier.create(service.getInbox("receiver-uid"))
                .expectNextCount(2)
                .verifyComplete();
    }

    @Test
    void getInbox_noEntries_returnsEmpty() {
        when(repository.findByReceiverId("user-x")).thenReturn(Flux.empty());
        when(repository.findBySenderId("user-x")).thenReturn(Flux.empty());

        StepVerifier.create(service.getInbox("user-x"))
                .verifyComplete();
    }

    // --- respond ---

    @Test
    void respond_accepted_updatesIsAcceptedAndNotifiesSender() {
        when(repository.findById(1L)).thenReturn(Mono.just(entry));
        when(repository.save(any(InboxEntry.class))).thenAnswer(inv -> Mono.just(inv.getArgument(0)));
        doNothing().when(notificationService).notify(anyString(), anyString());

        StepVerifier.create(service.respond(1L, "receiver-uid", true))
                .assertNext(saved -> assertThat(saved.getIsAccepted()).isTrue())
                .verifyComplete();

        verify(notificationService).notify(eq("sender-uid"), anyString());
    }

    @Test
    void respond_declined_updatesIsAcceptedToFalse() {
        when(repository.findById(1L)).thenReturn(Mono.just(entry));
        when(repository.save(any(InboxEntry.class))).thenAnswer(inv -> Mono.just(inv.getArgument(0)));
        doNothing().when(notificationService).notify(anyString(), anyString());

        StepVerifier.create(service.respond(1L, "receiver-uid", false))
                .assertNext(saved -> assertThat(saved.getIsAccepted()).isFalse())
                .verifyComplete();
    }

    @Test
    void respond_notReceiver_throwsForbidden() {
        when(repository.findById(1L)).thenReturn(Mono.just(entry));

        StepVerifier.create(service.respond(1L, "wrong-user", true))
                .expectErrorSatisfies(ex -> {
                    assertThat(ex).isInstanceOf(ResponseStatusException.class);
                    assertThat(((ResponseStatusException) ex).getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
                })
                .verify();

        verify(repository, never()).save(any());
    }

    @Test
    void respond_nonExistingEntry_throwsNotFound() {
        when(repository.findById(99L)).thenReturn(Mono.empty());

        StepVerifier.create(service.respond(99L, "receiver-uid", true))
                .expectErrorSatisfies(ex -> {
                    assertThat(ex).isInstanceOf(ResponseStatusException.class);
                    assertThat(((ResponseStatusException) ex).getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
                })
                .verify();
    }
}
