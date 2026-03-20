package com.jub.hub.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@Data
@Table("hub.inbox_entries")
public class InboxEntry {

    @Id
    @Column("id")
    private Long id;

    @Column("sender_id")
    private String senderId;

    @Column("receiver_id")
    private String receiverId;

    @Column("job_posting_id")
    private Long jobPostingId;

    @Column("sender_type")
    private String senderType;

    @Column("message")
    private String message;

    @Column("is_accepted")
    private Boolean isAccepted;

    @Column("created_at")
    private Instant createdAt;
}
