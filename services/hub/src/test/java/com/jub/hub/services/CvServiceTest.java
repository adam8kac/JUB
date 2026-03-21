package com.jub.hub.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Map;
import java.util.function.Function;
import java.util.function.Predicate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "rawtypes"})
class CvServiceTest {

    @Mock
    private WebClient webClient;

    @Mock
    private WebClient.RequestHeadersUriSpec uriSpec;

    @Mock
    private WebClient.RequestHeadersSpec headersSpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;

    private CvService service;

    @BeforeEach
    void setUp() {
        service = new CvService(webClient);
        doReturn(uriSpec).when(webClient).get();
    }

    // --- getAllCvs ---

    @Test
    void getAllCvs_success_returnsList() {
        Map<String, Object> cv1 = Map.of("uid", "user-1", "name", "John");
        Map<String, Object> cv2 = Map.of("uid", "user-2", "name", "Jane");

        doReturn(headersSpec).when(uriSpec).uri("/cvs");
        doReturn(responseSpec).when(headersSpec).retrieve();
        when(responseSpec.onStatus(any(Predicate.class), any(Function.class))).thenReturn(responseSpec);
        when(responseSpec.bodyToFlux(Map.class)).thenReturn(Flux.just(cv1, cv2));

        StepVerifier.create(service.getAllCvs())
                .assertNext(cv -> assertThat(cv.get("uid")).isEqualTo("user-1"))
                .assertNext(cv -> assertThat(cv.get("uid")).isEqualTo("user-2"))
                .verifyComplete();
    }

    @Test
    void getAllCvs_empty_returnsEmptyFlux() {
        doReturn(headersSpec).when(uriSpec).uri("/cvs");
        doReturn(responseSpec).when(headersSpec).retrieve();
        when(responseSpec.onStatus(any(Predicate.class), any(Function.class))).thenReturn(responseSpec);
        when(responseSpec.bodyToFlux(Map.class)).thenReturn(Flux.empty());

        StepVerifier.create(service.getAllCvs())
                .verifyComplete();
    }

    // --- getCvByUid ---

    @Test
    void getCvByUid_found_returnsCv() {
        Map<String, Object> cv = Map.of("uid", "user-1", "name", "John");

        doReturn(headersSpec).when(uriSpec).uri("/cvs/{uid}", "user-1");
        doReturn(responseSpec).when(headersSpec).retrieve();
        when(responseSpec.onStatus(any(Predicate.class), any(Function.class))).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(Map.class)).thenReturn(Mono.just(cv));

        StepVerifier.create(service.getCvByUid("user-1"))
                .assertNext(result -> {
                    assertThat(result.get("uid")).isEqualTo("user-1");
                    assertThat(result.get("name")).isEqualTo("John");
                })
                .verifyComplete();
    }

    @Test
    void getCvByUid_notFound_throwsNotFound() {
        doReturn(headersSpec).when(uriSpec).uri("/cvs/{uid}", "missing-user");
        doReturn(responseSpec).when(headersSpec).retrieve();
        when(responseSpec.onStatus(any(Predicate.class), any(Function.class))).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(Map.class))
                .thenReturn(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "CV not found")));

        StepVerifier.create(service.getCvByUid("missing-user"))
                .expectErrorSatisfies(ex -> {
                    assertThat(ex).isInstanceOf(ResponseStatusException.class);
                    assertThat(((ResponseStatusException) ex).getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
                })
                .verify();
    }
}
