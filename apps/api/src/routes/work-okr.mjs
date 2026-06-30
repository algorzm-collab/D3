import { guardedHandler } from "../guarded-handler.mjs";
import { checkinRepository as defaultCheckinRepository } from "../repositories/checkin-repository.mjs";

export function createWorkOkrRoutes({
  checkinRepository = defaultCheckinRepository,
  auditRepository
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
        workflowState: payload.workflowState ?? "draft",
        sensitivity: payload.sensitivity ?? "restricted"
      };
    },
    async handle(requestContext, payload) {
      const checkin = await checkinRepository.create({
        tenantId: requestContext.actor.tenantId,
        userId: payload.userId,
        organizationId: payload.organizationId,
        checkinDate: payload.checkinDate,
        summary: payload.summary,
        blocker: payload.blocker ?? null,
        supportRequested: Boolean(payload.supportRequested),
        workflowState: payload.workflowState ?? "draft",
        sensitivity: payload.sensitivity ?? "restricted"
      });

      return { data: checkin };
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
