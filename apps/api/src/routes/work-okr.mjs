import { guardedHandler } from "../guarded-handler.mjs";
import { createPersonaMetricEvent } from "../persona-metrics.mjs";
import { checkinRepository as defaultCheckinRepository } from "../repositories/checkin-repository.mjs";
import { workEvidenceRepository as defaultWorkEvidenceRepository } from "../repositories/work-evidence-repository.mjs";
import { metricRepository as defaultMetricRepository } from "../repositories/metric-repository.mjs";

export function createWorkOkrRoutes({
  checkinRepository = defaultCheckinRepository,
  workEvidenceRepository = defaultWorkEvidenceRepository,
  auditRepository,
  metricRepository = defaultMetricRepository
} = {}) {
  const createDailyCheckin = guardedHandler({
    action: "create",
    auditRepository,
    resourceFromRequest(requestContext, payload) {
      return {
        tenantId: requestContext.actor.tenantId,
        resourceType: "daily_checkin",
        ownerUserId: payload.userId,
        organizationId: payload.organizationId,
        resourceId: payload.atomicTaskId,
        workflowState: payload.workflowState ?? "draft",
        sensitivity: payload.sensitivity ?? "restricted"
      };
    },
    async handle(requestContext, payload) {
      const checkin = await checkinRepository.create({
        tenantId: requestContext.actor.tenantId,
        userId: payload.userId,
        organizationId: payload.organizationId,
        jobId: payload.jobId ?? null,
        jobVersionId: payload.jobVersionId ?? null,
        atomicTaskId: payload.atomicTaskId ?? null,
        checkinDate: payload.checkinDate,
        summary: payload.summary,
        blocker: payload.blocker ?? null,
        supportRequested: Boolean(payload.supportRequested),
        progressStatus: payload.progressStatus ?? "in_progress",
        workflowState: payload.workflowState ?? "draft",
        sensitivity: payload.sensitivity ?? "restricted"
      });

      const evidenceItems = await workEvidenceRepository.createManyFromCheckin({
        tenantId: requestContext.actor.tenantId,
        userId: payload.userId,
        dailyCheckinId: checkin.id,
        atomicTaskId: payload.atomicTaskId ?? null,
        evidenceItems: payload.evidenceItems ?? [],
        sensitivity: payload.sensitivity ?? "restricted"
      });

      await metricRepository.append(
        createPersonaMetricEvent({
          code: "daily_checkin_active_users",
          actor: requestContext.actor,
          resourceType: "daily_checkin",
          resourceId: checkin.id
        })
      );

      return { data: { ...checkin, evidenceItems } };
    }
  });

  const readTeamCheckins = guardedHandler({
    action: "read",
    auditRepository,
    resourceFromRequest(requestContext, payload) {
      return {
        tenantId: requestContext.actor.tenantId,
        resourceType: "daily_checkin",
        organizationId: payload.organizationId,
        workflowState: "submitted",
        sensitivity: payload.sensitivity ?? "restricted"
      };
    },
    async handle(requestContext, payload) {
      return {
        data: await checkinRepository.findSubmittedByOrganization({
          tenantId: requestContext.actor.tenantId,
          organizationId: payload.organizationId
        })
      };
    }
  });

  return {
    createDailyCheckin,
    readTeamCheckins
  };
}

export const { createDailyCheckin, readTeamCheckins } = createWorkOkrRoutes();
