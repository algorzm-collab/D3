export function personaFromActor(actor) {
  if (actor.roles.includes("hr")) return "hr";
  if (actor.roles.includes("manager")) return "manager";
  if (actor.roles.includes("institution_head")) return "institution_head";
  if (actor.roles.includes("consultant")) return "consultant";
  if (actor.roles.includes("system_operator")) return "system_operator";
  return "employee";
}

export function createPersonaMetricEvent({
  code,
  actor,
  resourceType,
  resourceId,
  value = 1
}) {
  return {
    code,
    tenantId: actor.tenantId,
    actorUserId: actor.userId,
    persona: personaFromActor(actor),
    occurredAt: new Date().toISOString(),
    value,
    resourceType,
    resourceId
  };
}

