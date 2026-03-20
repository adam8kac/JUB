package com.jub.hub.services;

import com.jub.hub.dto.JobPostingRequest;
import com.jub.hub.models.JobPosting;
import com.jub.hub.repository.JobPostingRepository;
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
public class JobPostingService {

    private final JobPostingRepository repository;

    public Flux<JobPosting> getActiveJobs(String category, String workType, String location, String experienceLevel) {
        return repository.findByIsActiveTrue()
                .filter(job -> category == null || category.equals(job.getJobCategory()))
                .filter(job -> workType == null || workType.equals(job.getWorkType()))
                .filter(job -> location == null || location.equalsIgnoreCase(job.getLocation()))
                .filter(job -> experienceLevel == null || experienceLevel.equals(job.getExperienceLevel()))
                .doOnError(e -> log.error("Error fetching active jobs: {}", e.getMessage()));
    }

    public Mono<JobPosting> getById(Long id) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Job posting not found")))
                .doOnError(e -> log.error("Error fetching job {}: {}", id, e.getMessage()));
    }

    public Mono<JobPosting> create(String employerId, JobPostingRequest req) {
        JobPosting posting = new JobPosting();
        posting.setEmployerId(employerId);
        posting.setCreatedAt(Instant.now());
        posting.setIsActive(true);
        applyRequest(posting, req);
        return repository.save(posting)
                .doOnSuccess(p -> log.info("Created job posting {} for employer {}", p.getId(), employerId));
    }

    public Mono<JobPosting> update(Long id, String employerId, JobPostingRequest req) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Job posting not found")))
                .flatMap(posting -> {
                    if (!employerId.equals(posting.getEmployerId())) {
                        return Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your posting"));
                    }
                    applyRequest(posting, req);
                    return repository.save(posting);
                })
                .doOnError(e -> log.error("Error updating job {}: {}", id, e.getMessage()));
    }

    public Mono<Void> deactivate(Long id, String employerId) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Job posting not found")))
                .flatMap(posting -> {
                    if (!employerId.equals(posting.getEmployerId())) {
                        return Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your posting"));
                    }
                    posting.setIsActive(false);
                    return repository.save(posting);
                })
                .then()
                .doOnError(e -> log.error("Error deactivating job {}: {}", id, e.getMessage()));
    }

    private void applyRequest(JobPosting posting, JobPostingRequest req) {
        posting.setTitle(req.getTitle());
        posting.setJobCategory(req.getJobCategory());
        posting.setDescription(req.getDescription());
        posting.setSalaryMin(req.getSalaryMin());
        posting.setSalaryMax(req.getSalaryMax());
        posting.setLocation(req.getLocation());
        posting.setWorkType(req.getWorkType());
        posting.setExperienceLevel(req.getExperienceLevel());
        posting.setSkillsRequired(req.getSkillsRequired());
        posting.setEducationLevel(req.getEducationLevel());
        posting.setDeadline(req.getDeadline());
    }
}
