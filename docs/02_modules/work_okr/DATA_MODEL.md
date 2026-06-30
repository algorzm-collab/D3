# Data Model: Work & OKR

## Tables

- okr_cycles
- objectives
- key_results
- daily_checkins
- work_evidences
- feedbacks

## Foundation Migration Coverage

`packages/database/migrations/0001_foundation.sql` currently creates:

- okr_cycles
- daily_checkins
- work_evidences

The following remain planned:

- objectives
- key_results
- feedbacks

## Sensitivity

Daily check-ins and work evidence are restricted by default.

Evidence can become sensitive or highly sensitive depending on evaluation, placement, legal, personal, or management-evaluation use.

## Lifecycle

Daily check-ins start as draft or submitted records and can be included in performance evidence after review.

They must not be used as final evaluation decisions without policy-controlled evaluation workflow.

