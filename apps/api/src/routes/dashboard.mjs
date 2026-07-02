import { guardedHandler } from "../guarded-handler.mjs";
import { readFile } from "node:fs/promises";
import { checkinRepository } from "../repositories/checkin-repository.mjs";
import { workEvidenceRepository } from "../repositories/work-evidence-repository.mjs";

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
      const checkins = await checkinRepository.findAll();
      const evidences = await workEvidenceRepository.findAll();
      
      const checkinsCount = checkins.length;
      const evidencesCount = evidences.length;

      const dynamicDashboardMetrics = datasets.demo.dashboardMetrics.map(m => {
        if (m.code === "daily_checkin_rate") {
          return { ...m, value: Math.min(100, 74 + checkinsCount * 2) };
        }
        return m;
      });

      return {
        tenant: datasets.demo.tenant,
        dashboardMetrics: dynamicDashboardMetrics,
        benchmark: {
          scope: datasets.benchmark.benchmarkScope,
          metrics: datasets.benchmark.metrics,
          demoNarrative: datasets.benchmark.demoNarrative
        },
        stats: {
          checkinsCount,
          evidencesCount
        }
      };
    }
  });

  return {
    readBenchmarkDashboard
  };
}

export const { readBenchmarkDashboard } = createDashboardRoutes();
