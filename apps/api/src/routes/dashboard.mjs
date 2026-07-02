import { guardedHandler } from "../guarded-handler.mjs";
import { readFile } from "node:fs/promises";

async function loadDummyDatasets() {
  const demoRaw = await readFile(
    new URL("../../../../packages/database/dummy/generic_public_hr_demo.dataset.json", import.meta.url),
    "utf8"
  );
  const benchmarkRaw = await readFile(
    new URL("../../../../packages/database/dummy/generic_benchmark_snapshot.dataset.json", import.meta.url),
    "utf8"
  );
  return {
    demo: JSON.parse(demoRaw),
    benchmark: JSON.parse(benchmarkRaw)
  };
}

export function createDashboardRoutes({
  auditRepository
} = {}) {
  const readBenchmarkDashboard = guardedHandler({
    action: "read",
    auditRepository,
    resourceFromRequest(requestContext, payload) {
      const roles = requestContext.actor.roles;
      let scope = "self";
      if (roles.includes("institution_head") || roles.includes("hr")) {
        scope = "aggregate";
      } else if (roles.includes("consultant")) {
        scope = "project";
      }
      
      return {
        tenantId: requestContext.actor.tenantId,
        resourceType: "benchmark_dashboard",
        resourceId: "benchmark_dashboard_default",
        scope,
        workflowState: "finalized",
        sensitivity: "internal"
      };
    },
    async handle(requestContext, payload) {
      const datasets = await loadDummyDatasets();
      return {
        tenant: datasets.demo.tenant,
        dashboardMetrics: datasets.demo.dashboardMetrics,
        benchmark: {
          scope: datasets.benchmark.benchmarkScope,
          metrics: datasets.benchmark.metrics,
          demoNarrative: datasets.benchmark.demoNarrative
        }
      };
    }
  });

  return {
    readBenchmarkDashboard
  };
}

export const { readBenchmarkDashboard } = createDashboardRoutes();
