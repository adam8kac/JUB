package com.jub.hub.controllers;

import com.jub.hub.dto.JobPostingRequest;
import com.jub.hub.models.JobPosting;
import com.jub.hub.security.JwtFilter;
import com.jub.hub.services.JobPostingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobPostingService service;

    @GetMapping
    public Flux<JobPosting> getJobs(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String workType,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String experienceLevel) {
        return service.getActiveJobs(category, workType, location, experienceLevel);
    }

    @GetMapping("/{id}")
    public Mono<JobPosting> getJob(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<JobPosting> createJob(@RequestBody @Valid JobPostingRequest request,
                                      ServerWebExchange exchange) {
        return getUid(exchange)
                .flatMap(uid -> service.create(uid, request));
    }

    @PutMapping("/{id}")
    public Mono<JobPosting> updateJob(@PathVariable Long id,
                                      @RequestBody @Valid JobPostingRequest request,
                                      ServerWebExchange exchange) {
        return getUid(exchange)
                .flatMap(uid -> service.update(id, uid, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteJob(@PathVariable Long id, ServerWebExchange exchange) {
        return getUid(exchange)
                .flatMap(uid -> service.deactivate(id, uid));
    }

    private Mono<String> getUid(ServerWebExchange exchange) {
        String uid = (String) exchange.getAttributes().get(JwtFilter.UID_ATTRIBUTE);
        if (uid == null) {
            return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required"));
        }
        return Mono.just(uid);
    }
}
