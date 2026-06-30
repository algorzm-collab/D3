# Persona Metrics Spec

## Purpose

Track whether persona hooks and DAU loops are actually working.

## Metric Events

Metric events are product telemetry, not HR evaluation data.

They must be used to improve product adoption, evidence completeness, and workflow health, not to evaluate individual employee performance.

## Core Metrics

- daily_checkin_active_users
- checkin_completion_rate
- evidence_created_per_user
- feedback_response_rate
- blocker_resolution_time
- career_progress_views
- jobdb_contribution_count
- veteran_answer_count
- benchmark_case_views
- evidence_pack_readiness_views

## Guardrails

- Product telemetry must not become hidden performance evaluation.
- Individual-level product telemetry must not be exposed to managers as behavioral surveillance.
- Aggregates are preferred for HR and institution-head views.
- Sensitive correlation requires explicit policy review.

## Initial Implementation

`daily_checkin_active_users` is emitted when an employee successfully creates a daily check-in.

Denied requests must not emit success metrics.
