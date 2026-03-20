-- Run this manually against your Supabase PostgreSQL instance
-- Schema: hub

CREATE SCHEMA IF NOT EXISTS hub;
SET search_path TO hub;

CREATE TABLE IF NOT EXISTS job_postings (
    id               BIGSERIAL PRIMARY KEY,
    employer_id      VARCHAR(255)             NOT NULL,
    title            VARCHAR(255)             NOT NULL,
    job_category     VARCHAR(100),
    description      TEXT,
    salary_min       INTEGER,
    salary_max       INTEGER,
    location         VARCHAR(255),
    work_type        VARCHAR(50),
    experience_level VARCHAR(50),
    skills_required  TEXT[],
    education_level  VARCHAR(50),
    deadline         DATE,
    is_active        BOOLEAN                  NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inbox_entries (
    id             BIGSERIAL PRIMARY KEY,
    sender_id      VARCHAR(255)             NOT NULL,
    receiver_id    VARCHAR(255)             NOT NULL,
    job_posting_id BIGINT REFERENCES job_postings (id),
    sender_type    VARCHAR(20)              NOT NULL,
    message        TEXT,
    is_accepted    BOOLEAN,
    created_at     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_postings_is_active ON job_postings (is_active);
CREATE INDEX IF NOT EXISTS idx_inbox_entries_receiver_id ON inbox_entries (receiver_id);
