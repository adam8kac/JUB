package com.jub.hub.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Table("hub.job_postings")
public class JobPosting {

    @Id
    @Column("id")
    private Long id;

    @Column("employer_id")
    private String employerId;

    @Column("title")
    private String title;

    @Column("job_category")
    private String jobCategory;

    @Column("description")
    private String description;

    @Column("salary_min")
    private Integer salaryMin;

    @Column("salary_max")
    private Integer salaryMax;

    @Column("location")
    private String location;

    @Column("work_type")
    private String workType;

    @Column("experience_level")
    private String experienceLevel;

    @Column("skills_required")
    private String[] skillsRequired;

    @Column("education_level")
    private String educationLevel;

    @Column("deadline")
    private LocalDate deadline;

    @Column("is_active")
    private Boolean isActive = true;

    @Column("created_at")
    private Instant createdAt;
}
