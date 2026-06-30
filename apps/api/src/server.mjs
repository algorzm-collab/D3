import http from "node:http";
import { createDailyCheckin, readTeamCheckins } from "./routes/work-okr.mjs";

function sendJson(response, status, body) {
  response.writeHead(status, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function actorFromHeaders(request) {
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

export function createServer() {
  return http.createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");
    const requestContext = {
      actor: actorFromHeaders(request),
      ipAddress: request.socket.remoteAddress,
      userAgent: request.headers["user-agent"]
    };

    try {
      if (request.method === "GET" && url.pathname === "/health") {
        return sendJson(response, 200, { status: "ok", service: "d3hr-api" });
      }

      if (request.method === "POST" && url.pathname === "/api/v1/work-okr/daily-checkins") {
        const payload = await readBody(request);
        const result = await createDailyCheckin(requestContext, payload);
        return sendJson(response, result.status, result.body);
      }

      if (request.method === "GET" && url.pathname === "/api/v1/work-okr/daily-checkins") {
        const payload = {
          organizationId: url.searchParams.get("organizationId"),
          sensitivity: url.searchParams.get("sensitivity") ?? "restricted"
        };
        const result = await readTeamCheckins(requestContext, payload);
        return sendJson(response, result.status, result.body);
      }

      return sendJson(response, 404, {
        error: { code: "RESOURCE_NOT_FOUND", message: "Route not found." }
      });
    } catch (error) {
      return sendJson(response, 500, {
        error: { code: "INTERNAL_ERROR", message: error.message }
      });
    }
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 3000);
  createServer().listen(port, () => {
    console.log(`D3HR API listening on http://localhost:${port}`);
  });
}

