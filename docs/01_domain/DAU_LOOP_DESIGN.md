# DAU Loop Design

## Purpose

D3HR must become the second screen after mail for public-institution employees and HR operators.

## Core Daily Loop

```text
Morning: check goals and priority
Midday: ask for help or update blocker
End of day: submit 3-line evidence
Next morning: see feedback, progress, and recommendations
```

## DAU Principle

Users do not open D3HR because HR asks them to input data.

They open it because:

- it protects their performance evidence,
- it shows career progress,
- it reveals useful team or institution signals,
- it gives access to trusted public-HR knowledge.

## Employee DAU Loop

Trigger:

- "Today goal is waiting."
- "Yesterday feedback arrived."
- "Your career progress changed."
- "Evidence missing for this week's objective."

Action:

- Check today's goal.
- Write 3-line check-in.
- Attach evidence or link.
- Read manager/veteran feedback.

Reward:

- Performance evidence accumulated.
- Career progress increases.
- Recommendation becomes more accurate.

Data:

- daily_checkins
- work_evidences
- blockers
- task links
- competency signals

## Manager DAU/WAU Loop

Trigger:

- "Three blockers need review."
- "Team evidence completeness dropped."
- "One employee has workload imbalance signal."

Action:

- Review team board.
- Give feedback.
- Resolve support request.
- Flag evidence gap.

Reward:

- Evaluation evidence is ready before evaluation season.
- Team risks become visible earlier.

Data:

- feedbacks
- blocker responses
- team risk signals
- evidence review status

## HR DAU Loop

Trigger:

- "JobDB approval queue has changed."
- "Evidence Pack readiness is below threshold."
- "Policy exception request arrived."

Action:

- Approve/reject job versions.
- Monitor evidence completeness.
- Review access/audit exceptions.
- Prepare Evidence Pack.

Reward:

- Management evaluation readiness improves continuously.
- Audit and policy risk decreases.

Data:

- job_versions
- approval state changes
- policy events
- audit logs
- evidence pack metrics

## Community / Benchmark Loop

Trigger:

- "A similar institution published a best-practice template."
- "A veteran answered your question."
- "Your job wiki contribution was accepted."

Action:

- Read best practice.
- Ask or answer question.
- Contribute to job wiki.

Reward:

- Expertise reputation grows.
- JobDB quality improves.
- User gets practical career and job knowledge.

Data:

- veteran answers
- accepted wiki edits
- benchmark case views
- best-practice saves

## DAU Metrics

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

## Anti-Patterns

- Notification spam without personal benefit
- Anonymous community detached from job/career evidence
- Dashboard with no next action
- Daily input that does not return value to the user
- Manager surveillance language
- Low-performance labeling

