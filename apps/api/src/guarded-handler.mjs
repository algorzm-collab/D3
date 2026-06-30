import { createAuditEvent, requiresAudit } from "../../../packages/audit/src/index.mjs";
import { evaluatePolicy } from "../../../packages/policy/src/index.mjs";

let auditSequence = 0;

export function guardedHandler({ action, resourceFromRequest, handle }) {
  return async function execute(requestContext, payload = {}) {
    const resource = resourceFromRequest(requestContext, payload);
    const policyDecision = evaluatePolicy({
      actor: requestContext.actor,
      action,
      resource
    });

    const auditEvents = [];
    const shouldAudit =
      policyDecision.requiredAudit || requiresAudit(action, resource.sensitivity);

    if (shouldAudit) {
      auditSequence += 1;
      auditEvents.push(
        createAuditEvent({
          id: `audit_${auditSequence}`,
          actor: requestContext.actor,
          action,
          resource,
          orgScope: requestContext.orgScope ?? "self",
          policyDecision,
          ipAddress: requestContext.ipAddress,
          userAgent: requestContext.userAgent
        })
      );
    }

    if (!policyDecision.allowed) {
      return {
        status: 403,
        body: {
          error: {
            code: "ACCESS_DENIED",
            message: "Access denied for this resource.",
            reasonCode: policyDecision.reasonCode
          }
        },
        auditEvents
      };
    }

    const result = await handle(requestContext, payload);

    return {
      status: 200,
      body: result,
      auditEvents
    };
  };
}

