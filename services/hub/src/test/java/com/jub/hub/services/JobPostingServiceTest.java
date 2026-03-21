package com.jub.hub.services;

import com.jub.hub.dto.JobPostingRequest;
import com.jub.hub.models.JobPosting;
import com.jub.hub.repository.JobPostingRepository;
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

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobPostingServiceTest {

    @Mock
    private JobPostingRepository repository;

    @InjectMocks
    private JobPostingService service;

    private JobPosting activeJob1;
    private JobPosting activeJob2;
    private JobPostingRequest request;

    @BeforeEach
    void setUp() {
        activeJob1 = new JobPosting();
        activeJob1.setId(1L);
        activeJob1.setEmployerId("employer-1");
        activeJob1.setTitle("Software Engineer");
        activeJob1.setJobCategory("IT");
        activeJob1.setWorkType("REMOTE");
        activeJob1.setLocation("Ljubljana");
        activeJob1.setExperienceLevel("SENIOR");
        activeJob1.setIsActive(true);

        activeJob2 = new JobPosting();
        activeJob2.setId(2L);
        activeJob2.setEmployerId("employer-2");
        activeJob2.setTitle("Designer");
        activeJob2.setJobCategory("DESIGN");
        activeJob2.setWorkType("ONSITE");
        activeJob2.setLocation("Maribor");
        activeJob2.setExperienceLevel("JUNIOR");
        activeJob2.setIsActive(true);

        request = new JobPostingRequest();
        request.setTitle("New Job");
        request.setJobCategory("IT");
        request.setDescription("Description");
        request.setSalaryMin(1000);
        request.setSalaryMax(3000);
        request.setLocation("Ljubljana");
        request.setWorkType("HYBRID");
        request.setExperienceLevel("MID");
        request.setSkillsRequired(new String[]{"Java", "Spring"});
        request.setEducationLevel("BACHELOR");
        request.setDeadline(LocalDate.of(2026, 12, 31));
    }

    // --- getActiveJobs ---

    @Test
    void getActiveJobs_noFilters_returnsAllActive() {
        when(repository.findByIsActiveTrue()).thenReturn(Flux.just(activeJob1, activeJob2));

        StepVerifier.create(service.getActiveJobs(null, null, null, null))
                .expectNext(activeJob1)
                .expectNext(activeJob2)
                .verifyComplete();
    }

    @Test
    void getActiveJobs_categoryFilter_returnsOnlyMatching() {
        when(repository.findByIsActiveTrue()).thenReturn(Flux.just(activeJob1, activeJob2));

        StepVerifier.create(service.getActiveJobs("IT", null, null, null))
                .expectNext(activeJob1)
                .verifyComplete();
    }

    @Test
    void getActiveJobs_workTypeFilter_returnsOnlyMatching() {
        when(repository.findByIsActiveTrue()).thenReturn(Flux.just(activeJob1, activeJob2));

        StepVerifier.create(service.getActiveJobs(null, "REMOTE", null, null))
                .expectNext(activeJob1)
                .verifyComplete();
    }

    @Test
    void getActiveJobs_locationFilter_caseInsensitive() {
        when(repository.findByIsActiveTrue()).thenReturn(Flux.just(activeJob1, activeJob2));

        StepVerifier.create(service.getActiveJobs(null, null, "ljubljana", null))
                .expectNext(activeJob1)
                .verifyComplete();
    }

    @Test
    void getActiveJobs_experienceLevelFilter_returnsOnlyMatching() {
        when(repository.findByIsActiveTrue()).thenReturn(Flux.just(activeJob1, activeJob2));

        StepVerifier.create(service.getActiveJobs(null, null, null, "JUNIOR"))
                .expectNext(activeJob2)
                .verifyComplete();
    }

    @Test
    void getActiveJobs_allFiltersNoMatch_returnsEmpty() {
        when(repository.findByIsActiveTrue()).thenReturn(Flux.just(activeJob1, activeJob2));

        StepVerifier.create(service.getActiveJobs("IT", "ONSITE", null, null))
                .verifyComplete();
    }

    // --- getById ---

    @Test
    void getById_existingId_returnsJob() {
        when(repository.findById(1L)).thenReturn(Mono.just(activeJob1));

        StepVerifier.create(service.getById(1L))
                .expectNext(activeJob1)
                .verifyComplete();
    }

    @Test
    void getById_nonExistingId_throwsNotFound() {
        when(repository.findById(99L)).thenReturn(Mono.empty());

        StepVerifier.create(service.getById(99L))
                .expectErrorSatisfies(ex -> {
                    assertThat(ex).isInstanceOf(ResponseStatusException.class);
                    assertThat(((ResponseStatusException) ex).getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
                })
                .verify();
    }

    // --- create ---

    @Test
    void create_validRequest_savesJobPosting() {
        JobPosting saved = new JobPosting();
        saved.setId(10L);
        saved.setEmployerId("emp-1");
        saved.setTitle("New Job");
        saved.setIsActive(true);

        when(repository.save(any(JobPosting.class))).thenReturn(Mono.just(saved));

        StepVerifier.create(service.create("emp-1", request))
                .assertNext(posting -> {
                    assertThat(posting.getId()).isEqualTo(10L);
                    assertThat(posting.getEmployerId()).isEqualTo("emp-1");
                    assertThat(posting.getIsActive()).isTrue();
                })
                .verifyComplete();

        verify(repository).save(any(JobPosting.class));
    }

    @Test
    void create_setsEmployerIdAndActive() {
        when(repository.save(any(JobPosting.class))).thenAnswer(inv -> {
            JobPosting p = inv.getArgument(0);
            p.setId(1L);
            return Mono.just(p);
        });

        StepVerifier.create(service.create("emp-42", request))
                .assertNext(posting -> {
                    assertThat(posting.getEmployerId()).isEqualTo("emp-42");
                    assertThat(posting.getIsActive()).isTrue();
                    assertThat(posting.getCreatedAt()).isNotNull();
                    assertThat(posting.getTitle()).isEqualTo("New Job");
                })
                .verifyComplete();
    }

    // --- update ---

    @Test
    void update_ownPosting_updatesSuccessfully() {
        when(repository.findById(1L)).thenReturn(Mono.just(activeJob1));
        when(repository.save(any(JobPosting.class))).thenAnswer(inv -> Mono.just(inv.getArgument(0)));

        StepVerifier.create(service.update(1L, "employer-1", request))
                .assertNext(posting -> {
                    assertThat(posting.getTitle()).isEqualTo("New Job");
                    assertThat(posting.getJobCategory()).isEqualTo("IT");
                    assertThat(posting.getSalaryMin()).isEqualTo(1000);
                })
                .verifyComplete();
    }

    @Test
    void update_notOwner_throwsForbidden() {
        when(repository.findById(1L)).thenReturn(Mono.just(activeJob1));

        StepVerifier.create(service.update(1L, "different-employer", request))
                .expectErrorSatisfies(ex -> {
                    assertThat(ex).isInstanceOf(ResponseStatusException.class);
                    assertThat(((ResponseStatusException) ex).getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
                })
                .verify();

        verify(repository, never()).save(any());
    }

    @Test
    void update_nonExistingId_throwsNotFound() {
        when(repository.findById(99L)).thenReturn(Mono.empty());

        StepVerifier.create(service.update(99L, "employer-1", request))
                .expectErrorSatisfies(ex -> {
                    assertThat(ex).isInstanceOf(ResponseStatusException.class);
                    assertThat(((ResponseStatusException) ex).getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
                })
                .verify();
    }

    // --- deactivate ---

    @Test
    void deactivate_ownPosting_setsInactiveAndSaves() {
        when(repository.findById(1L)).thenReturn(Mono.just(activeJob1));
        when(repository.save(any(JobPosting.class))).thenAnswer(inv -> Mono.just(inv.getArgument(0)));

        StepVerifier.create(service.deactivate(1L, "employer-1"))
                .verifyComplete();

        assertThat(activeJob1.getIsActive()).isFalse();
        verify(repository).save(activeJob1);
    }

    @Test
    void deactivate_notOwner_throwsForbidden() {
        when(repository.findById(1L)).thenReturn(Mono.just(activeJob1));

        StepVerifier.create(service.deactivate(1L, "other-employer"))
                .expectErrorSatisfies(ex -> {
                    assertThat(ex).isInstanceOf(ResponseStatusException.class);
                    assertThat(((ResponseStatusException) ex).getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
                })
                .verify();

        verify(repository, never()).save(any());
    }

    @Test
    void deactivate_nonExistingId_throwsNotFound() {
        when(repository.findById(99L)).thenReturn(Mono.empty());

        StepVerifier.create(service.deactivate(99L, "employer-1"))
                .expectErrorSatisfies(ex -> {
                    assertThat(ex).isInstanceOf(ResponseStatusException.class);
                    assertThat(((ResponseStatusException) ex).getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
                })
                .verify();
    }
}
