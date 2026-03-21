package com.jub.hub.services;

import org.junit.jupiter.api.Test;
import org.springframework.http.codec.ServerSentEvent;
import reactor.test.StepVerifier;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

class NotificationServiceTest {

    private final NotificationService service = new NotificationService();

    @Test
    void subscribe_createsFluxForUser() {
        StepVerifier.create(service.subscribe("user-1").take(0))
                .verifyComplete();
    }

    @Test
    void notify_withActiveSubscriber_emitsEvent() {
        StepVerifier.withVirtualTime(() ->
                        service.subscribe("user-1")
                                .doOnSubscribe(s -> service.notify("user-1", "hello"))
                                .take(1)
                )
                .thenAwait(Duration.ofMillis(100))
                .assertNext(event -> assertThat(event.data()).isEqualTo("hello"))
                .verifyComplete();
    }

    @Test
    void notify_noSubscriber_doesNotThrow() {
        // should not throw any exception
        service.notify("non-existent-user", "message");
    }

    @Test
    void subscribe_multipleUsers_independentStreams() {
        // Subscribe two different users
        var flux1 = service.subscribe("user-A").take(1);
        var flux2 = service.subscribe("user-B").take(1);

        service.notify("user-A", "msg-for-A");

        StepVerifier.create(flux1)
                .assertNext(event -> assertThat(event.data()).isEqualTo("msg-for-A"))
                .verifyComplete();

        // user-B should not have received anything yet
        service.notify("user-B", "msg-for-B");

        StepVerifier.create(flux2)
                .assertNext(event -> assertThat(event.data()).isEqualTo("msg-for-B"))
                .verifyComplete();
    }

    @Test
    void notify_messageContainedInEvent() {
        var flux = service.subscribe("user-x").take(1);

        service.notify("user-x", "{\"type\":\"NEW_REQUEST\",\"requestId\":42}");

        StepVerifier.create(flux)
                .assertNext(event -> {
                    assertThat(event).isInstanceOf(ServerSentEvent.class);
                    assertThat(event.data()).isEqualTo("{\"type\":\"NEW_REQUEST\",\"requestId\":42}");
                })
                .verifyComplete();
    }
}
