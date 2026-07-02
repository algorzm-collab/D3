import http from "node:http";
import { createDailyCheckin, readTeamCheckins } from "./routes/work-okr.mjs";
import { requestContextFromHttp } from "./request-context.mjs";

function sendJson(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "x-tenant-id, x-user-id, x-roles, x-org-ids, content-type",
    "access-control-allow-methods": "GET, POST, OPTIONS"
  });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function createServer() {
  return http.createServer(async (request, response) => {
    if (request.method === "OPTIONS") {
      response.writeHead(240, {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "x-tenant-id, x-user-id, x-roles, x-org-ids, content-type",
        "access-control-allow-methods": "GET, POST, OPTIONS"
      });
      return response.end();
    }

    const url = new URL(request.url, "http://localhost");
    const requestContext = requestContextFromHttp(request);

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
