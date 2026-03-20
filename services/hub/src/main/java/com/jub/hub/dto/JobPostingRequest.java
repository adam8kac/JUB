package com.jub.hub.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class JobPostingRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String jobCategory;

    private String description;

    @Min(0)
    private Integer salaryMin;

    @Min(0)
    private Integer salaryMax;

    private String location;

    private String workType;

    private String experienceLevel;

    private String[] skillsRequired;

    private String educationLevel;

    private LocalDate deadline;
}
