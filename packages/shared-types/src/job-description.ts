export type JobDescriptionElementGroupCode =
  | "strategic_input"
  | "job_core"
  | "requirement"
  | "job_value_grade"
  | "performance_management"
  | "competency_diagnosis"
  | "compensation_linkage"
  | "promotion_linkage"
  | "workforce_planning"
  | "mobility_career"
  | "targeted_talent"
  | "recruitment_linkage"
  | "retirement_exit_linkage";

export type JobDescriptionFieldDataType =
  | "text"
  | "long_text"
  | "number"
  | "boolean"
  | "enum"
  | "tag"
  | "relation"
  | "workflow_ref"
  | "rule"
  | "score";

export type JobDescriptionCustomizationLevel =
  | "core_required"
  | "public_standard"
  | "tenant_configurable"
  | "future_phase"
  | "prohibited_in_mvp";

export type JobDescriptionSourceType =
  | "ncs_derived"
  | "institution_modified"
  | "institution_created"
  | "consultant_proposed"
  | "system_inferred";

export interface JobDescriptionFieldDefinition {
  code: string;
  groupCode: JobDescriptionElementGroupCode;
  name: string;
  dataType: JobDescriptionFieldDataType;
  isMvp: boolean;
  sensitivity: string;
  isVersioned: boolean;
  ncsLink: "yes" | "partial" | "no";
  customizationLevel: JobDescriptionCustomizationLevel;
  linkedModules: string[];
}

export interface JobDescriptionFieldValue {
  jobVersionId: string;
  fieldCode: string;
  sourceType: JobDescriptionSourceType;
  valueText?: string;
  valueNumber?: number;
  valueBoolean?: boolean;
  valueJson?: unknown;
}

export interface JobAtomicTaskRow {
  order: number;
  taskGroup: string | null;
  subTask: string;
  importance: number;
  difficulty: number;
  jobSize: number;
  sourceLine: string;
  parserVersion: "task_row_v1";
}

export interface JobCareerLink {
  order: number;
  direction: "prior" | "next";
  targetOrder: number;
  targetTitle: string;
  similarityMarker: "selected";
  sourceLine: string;
  parserVersion: "career_link_v1";
}
