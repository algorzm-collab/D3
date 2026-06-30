export type PersonaMetricCode =
  | "daily_checkin_active_users"
  | "checkin_completion_rate"
  | "evidence_created_per_user"
  | "feedback_response_rate"
  | "blocker_resolution_time"
  | "career_progress_views"
  | "jobdb_contribution_count"
  | "veteran_answer_count"
  | "benchmark_case_views"
  | "evidence_pack_readiness_views";

export interface PersonaMetricEvent {
  code: PersonaMetricCode;
  tenantId: string;
  actorUserId?: string;
  persona:
    | "employee"
    | "manager"
    | "hr"
    | "institution_head"
    | "consultant"
    | "external_evaluator"
    | "system_operator"
    | "veteran";
  occurredAt: string;
  value?: number;
  resourceType?: string;
  resourceId?: string;
}

