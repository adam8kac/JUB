package com.jub.hub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InboxEntryRequest {

    @NotBlank
    private String receiverId;

    @NotNull
    private Long jobPostingId;

    @NotBlank
    private String senderType;

    private String message;
}
