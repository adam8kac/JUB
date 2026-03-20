package com.jub.hub.repository;

import com.jub.hub.models.JobPosting;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface JobPostingRepository extends ReactiveCrudRepository<JobPosting, Long> {
    Flux<JobPosting> findByIsActiveTrue();
    Flux<JobPosting> findByEmployerId(String employerId);
}
