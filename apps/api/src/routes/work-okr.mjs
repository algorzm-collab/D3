import { guardedHandler } from "../guarded-handler.mjs";

const checkins = [];

export const createDailyCheckin = guardedHandler({
  action: "create",
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
    const checkin = {
      id: `checkin_${checkins.length + 1}`,
      tenantId: requestContext.actor.tenantId,
      userId: payload.userId,
      organizationId: payload.organizationId,
      checkinDate: payload.checkinDate,
      summary: payload.summary,
      blocker: payload.blocker ?? null,
      supportRequested: Boolean(payload.supportRequested),
      workflowState: payload.workflowState ?? "draft",
      createdAt: new Date().toISOString()
    };

    checkins.push(checkin);

    return { data: checkin };
  }
});

export const readTeamCheckins = guardedHandler({
  action: "read",
  resourceFromRequest(requestContext, payload) {
    return {
      tenantId: requestContext.actor.tenantId,
      resourceType: "daily_checkin",
      organizationId: payload.organizationId,
      workflowState: "submitted",
      sensitivity: payload.sensitivity ?? "restricted"
    };
  },
  async handle(_requestContext, payload) {
    return {
      data: checkins.filter(
        (checkin) =>
          checkin.organizationId === payload.organizationId &&
          checkin.workflowState === "submitted"
      )
    };
  }
});

export function resetCheckinsForTest() {
  checkins.length = 0;
}

