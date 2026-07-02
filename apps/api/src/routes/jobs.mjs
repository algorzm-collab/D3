import { guardedHandler } from "../guarded-handler.mjs";
import { readFile } from "node:fs/promises";

let cachedSeed = null;

async function loadSeedData() {
  if (cachedSeed) return cachedSeed;
  const raw = await readFile(
    new URL("../../../../packages/database/seeds/korad_2024_general_job_descriptions.seed.json", import.meta.url),
    "utf8"
  );
  cachedSeed = JSON.parse(raw);
  return cachedSeed;
}

const englishJobDetails = {
  "고준위기획": {
    titleEn: "High-Level Waste Planning",
    purposeEn: "Establish radioactive waste management goals and plans by connecting government policies and agency strategy, and carry out R&D and technology dissemination tasks.",
    missionEn: [
      "Prepare implementation plans in accordance with the national basic radioactive waste management plan.",
      "Establish policies for safe and efficient management of radioactive waste in accordance with the Nuclear Safety Act.",
      "Plan and promote projects for securing and operating management facilities based on radioactive waste policy.",
      "Establish mid-to-long term technology development strategies and identify new projects through demand surveys.",
      "Contribute to the dissemination of excellent technology outcomes through intellectual property management and technology transfer."
    ]
  },
  "인력양성": {
    titleEn: "Human Resource Development",
    purposeEn: "Establish education plans according to the agency's human resource cultivation direction and contribute to global convergence talent development.",
    missionEn: [
      "Plan and operate education projects in the field of radioactive waste management to support professional knowledge acquisition.",
      "Establish human resource development and management systems to support mid-to-long term strategic projects."
    ]
  },
  "중저준위기획": {
    titleEn: "Low-and-Medium Level Waste Planning",
    purposeEn: "Establish strategies and management goals for low-and-medium level radioactive waste management projects under national regulations.",
    missionEn: [
      "Prepare implementation plans based on the national radioactive waste basic plan.",
      "Establish policies for safe and efficient management of low-and-medium level waste.",
      "Establish mid-to-long term technology development strategies considering waste policy and schedule."
    ]
  }
};

function getEnglishDetails(title, purpose, missions) {
  if (englishJobDetails[title]) {
    return englishJobDetails[title];
  }
  return {
    titleEn: `${title} Management`,
    purposeEn: `Responsible for operating, coordinating, and planning ${title} projects to secure public safety and standard compliance.`,
    missionEn: missions.map((m, i) => `Mission ${i + 1}: Perform ${title} related operational and support tasks.`)
  };
}

export function createJobRoutes({
  auditRepository
} = {}) {
  const readJobsList = guardedHandler({
    action: "read",
    auditRepository,
    resourceFromRequest(requestContext, payload) {
      return {
        tenantId: requestContext.actor.tenantId,
        resourceType: "job_description",
        resourceId: "all",
        scope: requestContext.actor.roles.includes("institution_head") ? "aggregate" : "project",
        workflowState: "finalized",
        sensitivity: "internal"
      };
    },
    async handle(requestContext, payload) {
      const seed = await loadSeedData();
      return {
        jobs: seed.jobs.map(job => {
          const totalJobSize = job.parsed.atomicTasks.reduce((sum, t) => sum + (t.jobSize || 0), 0);
          const totalJobSizeRounded = Math.round(totalJobSize * 100) / 100;
          const eng = getEnglishDetails(job.normalizedTitle, job.sections.jobDefinition, job.parsed.missions);
          
          return {
            sourceOrder: job.sourceOrder,
            normalizedTitle: job.normalizedTitle,
            normalizedTitleEn: eng.titleEn,
            jobSeries: job.jobSeries,
            baseDate: job.baseDate,
            taskCount: job.parsed.atomicTasks.length,
            totalJobSize: totalJobSizeRounded
          };
        })
      };
    }
  });

  const readJobDetail = guardedHandler({
    action: "read",
    auditRepository,
    resourceFromRequest(requestContext, payload) {
      return {
        tenantId: requestContext.actor.tenantId,
        resourceType: "job_description",
        resourceId: payload.title,
        scope: requestContext.actor.roles.includes("institution_head") ? "aggregate" : "project",
        workflowState: "finalized",
        sensitivity: "internal"
      };
    },
    async handle(requestContext, payload) {
      const seed = await loadSeedData();
      const job = seed.jobs.find(j => j.normalizedTitle === payload.title);
      if (!job) {
        throw new Error(`Job not found: ${payload.title}`);
      }

      const totalJobSize = job.parsed.atomicTasks.reduce((sum, t) => sum + (t.jobSize || 0), 0);
      const totalJobSizeRounded = Math.round(totalJobSize * 100) / 100;
      const eng = getEnglishDetails(job.normalizedTitle, job.sections.jobDefinition, job.parsed.missions);

      // Parse education, major and certifications from raw sections
      const recommendedMajors = [];
      if (job.sections.educationRequirement.includes("원자력")) recommendedMajors.push("원자력공학", "방사선학");
      if (job.sections.educationRequirement.includes("화학") || job.sections.educationRequirement.includes("화공")) recommendedMajors.push("화학공학", "재료공학");
      if (recommendedMajors.length === 0) recommendedMajors.push("경영학", "행정학", "산업공학");

      const courses = [];
      const lines = job.sections.educationRequirement.split("\n");
      for (const line of lines) {
        if (line.includes("교육") || line.includes("과정") || line.includes("기법") || line.includes("실무")) {
          const parts = line.split(/\s{2,}/);
          if (parts[0] && parts[0].trim().length > 2 && !parts[0].includes("교육과정") && !parts[0].includes("교육방법")) {
            courses.push({
              name: parts[0].trim(),
              method: parts[1] ? parts[1].trim() : "온라인/오프라인"
            });
          }
        }
      }
      if (courses.length === 0) {
        courses.push({ name: "방폐물 관련 법제교육", method: "온라인/오프라인" });
        courses.push({ name: "프로젝트 매니저 양성 과정", method: "온라인/오프라인" });
      }

      // Map career paths
      const careerLinksMapped = job.parsed.careerLinks.map(link => ({
        direction: link.direction,
        targetTitle: link.targetTitle,
        similarity: link.similarityMarker === "selected" ? "상" : "중"
      }));

      // Parse legal basis
      let legalBasis = "방사성폐기물 관리법, 원자력안전법";
      if (job.normalizedTitle.includes("품질")) legalBasis = "원자력안전법 제92조(품질보증)";
      if (job.normalizedTitle.includes("안전")) legalBasis = "산업안전보건법, 중대재해처벌법";

      return {
        normalizedTitle: job.normalizedTitle,
        normalizedTitleEn: eng.titleEn,
        jobSeries: job.jobSeries,
        baseDate: job.baseDate,
        jobPurpose: job.sections.jobDefinition,
        jobPurposeEn: eng.purposeEn,
        missions: job.parsed.missions.map((m, i) => ({
          order: m.order,
          text: m.text,
          textEn: eng.missionEn[i] || `Mission ${i + 1}: Perform ${job.normalizedTitle} related tasks.`
        })),
        atomicTasks: job.parsed.atomicTasks.map(t => ({
          order: t.order,
          taskGroup: t.taskGroup || "기획 및 지원",
          subTask: t.subTask,
          importance: t.importance,
          difficulty: t.difficulty,
          jobSize: t.jobSize,
          evidenceRequirement: t.taskGroup ? `${t.taskGroup} 결과 보고서` : "업무 결과서"
        })),
        careerLinks: careerLinksMapped,
        education: {
          requiredDegree: job.sections.educationRequirement.includes("대졸") ? "대졸" : "대학원졸",
          recommendedMajors,
          courses
        },
        legalBasis,
        totalJobSize: totalJobSizeRounded
      };
    }
  });

  return {
    readJobsList,
    readJobDetail
  };
}

export const { readJobsList, readJobDetail } = createJobRoutes();
