export function actorFromHeaders(request) {
  return {
    tenantId: request.headers["x-tenant-id"] ?? "tenant_demo",
    userId: request.headers["x-user-id"] ?? "user_demo",
    roles: String(request.headers["x-roles"] ?? "employee")
      .split(",")
      .map((role) => role.trim())
      .filter(Boolean),
    organizationIds: String(request.headers["x-org-ids"] ?? "")
      .split(",")
      .map((orgId) => orgId.trim())
      .filter(Boolean)
  };
}

export function requestContextFromHttp(request) {
  return {
    actor: actorFromHeaders(request),
    ipAddress: request.socket.remoteAddress,
    userAgent: request.headers["user-agent"]
  };
}

