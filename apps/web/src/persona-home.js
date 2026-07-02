const personaHomes = {
  employee: {
    title: "직원 홈",
    hook: "오늘 한 일이 성과와 커리어가 됩니다",
    heroTitle: "3줄 체크인",
    heroText:
      "오늘 한 일을 짧게 기록하면 성과증빙, 직무숙련도, 커리어 진행률로 연결됩니다.",
    action: "체크인 작성",
    metrics: [
      ["이번 주 목표", "68%", "OKR 진행률"],
      ["성과증빙", "14건", "이번 달 누적"],
      ["커리어 진행", "+3.2", "직무숙련도 변화"],
      ["피드백", "2건", "확인 대기"]
    ],
    missions: [
      "오늘의 우선업무 3개 확인",
      "퇴근 전 3줄 체크인 작성",
      "증빙 링크 또는 파일 연결",
      "관리자 피드백 확인",
      "추천 교육 또는 전환 직무 확인"
    ],
    flow: [
      "daily_checkins",
      "work_evidences",
      "task/job mappings",
      "competency signals",
      "performance evidence",
      "career progress"
    ]
  },
  manager: {
    title: "관리자 홈",
    hook: "팀 운영을 기억이 아니라 근거로 합니다",
    heroTitle: "팀 진행률과 지원요청",
    heroText:
      "팀원의 제출된 체크인, 막힌 일, 성과근거 누락, 업무량 신호를 한 화면에서 봅니다.",
    action: "팀 보드 열기",
    metrics: [
      ["팀 진행률", "72%", "이번 주"],
      ["지원요청", "3건", "오늘 처리 필요"],
      ["증빙누락", "5명", "확인 필요"],
      ["과부하 신호", "2명", "관찰 필요"]
    ],
    missions: [
      "제출된 팀 체크인 확인",
      "막힌 업무와 지원요청 처리",
      "성과근거 부족자에게 피드백",
      "업무량/직무적합 리스크 확인",
      "평가 시즌 전 근거 축적 상태 점검"
    ],
    flow: [
      "team check-ins",
      "blockers",
      "manager feedback",
      "workload signals",
      "evidence completeness",
      "evaluation readiness"
    ]
  },
  hr: {
    title: "HR 홈",
    hook: "직무중심 인사 전환을 매일 운영합니다",
    heroTitle: "HR Evidence Control Center",
    heroText:
      "JobDB 품질, 승인 대기, 성과근거 축적률, 감사로그, Evidence Pack 준비도를 관리합니다.",
    action: "승인 대기 보기",
    metrics: [
      ["JobDB 완성도", "84%", "목표 90%"],
      ["승인대기", "12건", "직무기술서"],
      ["Evidence Pack", "63%", "준비도"],
      ["정책예외", "1건", "검토 필요"]
    ],
    missions: [
      "NCS-to-JobDB 매핑률 확인",
      "직무기술서 버전 승인/반려",
      "성과근거 축적률 모니터링",
      "권한/감사 예외 확인",
      "경영평가 Evidence Pack 준비"
    ],
    flow: [
      "ncs_units",
      "jobs/job_versions",
      "tasks/competencies",
      "daily evidence",
      "evaluation readiness",
      "evidence packs"
    ]
  },
  institution_head: {
    title: "기관장 홈",
    hook: "사람·성과·정원 리스크를 브리핑합니다",
    heroTitle: "오늘의 HR 리스크 브리핑",
    heroText:
      "개인 민감정보 탐색이 아니라, 집계된 직무중심 인사 전환과 인력 리스크를 봅니다.",
    action: "브리핑 보기",
    metrics: [
      ["전환지수", "71점", "직무중심 HR"],
      ["핵심 리스크", "4건", "조치 필요"],
      ["과부하 조직", "5곳", "월간 집계"],
      ["고성과 신호", "18명", "육성 후보"]
    ],
    missions: [
      "전사 HR 리스크 브리핑 확인",
      "직무중심 인사 전환지표 점검",
      "업무량/정원 리스크 확인",
      "고성과 핵심인재 육성 신호 확인",
      "경영평가 리스크 조기 조치"
    ],
    flow: [
      "aggregate evidence",
      "workload imbalance",
      "job-fit risk",
      "high-performer signals",
      "transition index",
      "management briefing"
    ]
  },
  consultant: {
    title: "컨설턴트 홈",
    hook: "컨설팅 산출물을 운영 시스템으로 남깁니다",
    heroTitle: "NCS 매핑과 직무품질 진단",
    heroText:
      "직무분석, 제도설계, 인터뷰 결과를 JobDB와 Evidence Pack으로 운영화합니다.",
    action: "진단 보드 열기",
    metrics: [
      ["NCS 매핑률", "57%", "파일럿 기관"],
      ["품질이슈", "9건", "검토 필요"],
      ["미정의 과업", "24개", "정리 필요"],
      ["우수사례", "6건", "적용 후보"]
    ],
    missions: [
      "NCS 매핑 누락 확인",
      "직무기술서 품질 이슈 리뷰",
      "기관 규정과 승인흐름 점검",
      "우수사례 템플릿 적용",
      "운영 가능한 JobDB로 납품"
    ],
    flow: [
      "NCS mapping",
      "job diagnostics",
      "review comments",
      "policy workflow",
      "operating JobDB",
      "evidence assets"
    ]
  }
};

const fallbackBenchmarkData = {
  tenant: {
    id: "tenant_demo_public_agency",
    name: "대한공공서비스원",
    publicInstitutionType: "fictional_public_institution"
  },
  dashboardMetrics: [
    { code: "jobdb_completion_rate", label: "직무기술서 구조화율", value: 68, unit: "%" },
    { code: "daily_checkin_rate", label: "일일 업무체크 참여율", value: 74, unit: "%" },
    { code: "career_path_coverage", label: "경력경로 연결률", value: 52, unit: "%" }
  ],
  benchmark: {
    scope: {
      sector: "fictional_public_institutions",
      sampleSize: 12,
      aggregationLevel: "synthetic_aggregate",
      asOf: "2026-07-01"
    },
    metrics: [
      {
        code: "jobdb_structuring_rate",
        label: "직무기술서 구조화율",
        median: 61,
        topQuartile: 78,
        unit: "%",
        interpretation: "직무기술서가 필드화되어 업무, 역량, 성과, 경력 데이터로 연결된 비율"
      },
      {
        code: "daily_evidence_activation",
        label: "일일 업무증거 활성도",
        median: 48,
        topQuartile: 72,
        unit: "%",
        interpretation: "일일 체크인이 직무 원자 과업과 증거 항목에 연결된 비율"
      },
      {
        code: "career_graph_coverage",
        label: "경력경로 그래프 연결률",
        median: 44,
        topQuartile: 69,
        unit: "%",
        interpretation: "선행/후행 직무 연결이 구조화된 직무 비율"
      },
      {
        code: "policy_guardrail_coverage",
        label: "권한정책 테스트 커버리지",
        median: 58,
        topQuartile: 83,
        unit: "%",
        interpretation: "역할, 조직범위, 민감도, 워크플로우별 정책 테스트가 존재하는 비율"
      }
    ],
    demoNarrative: [
      "우리 기관의 직무기술서 구조화율은 공공기관 가상 벤치고위권입니다.",
      "일일 업무증거 활성도는 낮아, 체크인과 과업 연결을 강화하면 성과평가 근거 품질이 개선됩니다.",
      "경력경로 그래프 연결률은 배치와 커리어 추천의 설명가능성을 높이는 핵심 지표입니다."
    ]
  }
};

const fallbackJobs = [
  {
    id: "job_public_strategy_planning",
    title: "공공전략기획",
    jobSeries: "경영기획",
    mission: "기관 전략과 정부정책 요구를 연결하여 실행 가능한 공공성과 계획을 수립한다.",
    tasksCount: 2
  },
  {
    id: "job_hr_placement",
    title: "직무중심인사배치",
    jobSeries: "인사관리",
    mission: "직무, 역량, 경력희망, 조직수요를 근거로 설명 가능한 배치안을 설계한다.",
    tasksCount: 2
  }
];

async function renderBenchmark() {
  document.querySelector("#persona-title").textContent = "벤치마크 대시보드";
  document.querySelector("#persona-hook").textContent = "가상 공공기관 대비 우리 기관 지표 진단";
  
  document.querySelector("#primary-panel").innerHTML = `
    <div>
      <h2>가상 벤치마크 분석 브리핑</h2>
      <p>동종 공공기관 12개사 대비 우리 기관(대한공공서비스원)의 직무 중심 HR 설계 완성도입니다. 범례에 따라 상대 위치를 시각화했습니다.</p>
      <div class="benchmark-legend">
        <div class="legend-item"><span class="legend-color our"></span>우리 기관</div>
        <div class="legend-item"><span class="legend-color median"></span>벤치마크 중간값 (50%)</div>
        <div class="legend-item"><span class="legend-color top"></span>상위 25% 선</div>
      </div>
    </div>
  `;

  document.querySelector("#metric-grid").innerHTML = `
    <div style="grid-column: 1 / -1; padding: 20px; text-align: center; color: var(--muted);">
      지표 데이터를 불러오는 중...
    </div>
  `;

  let data = fallbackBenchmarkData;
  let jobs = fallbackJobs;
  
  try {
    const response = await fetch("http://localhost:3000/api/v1/dashboard/benchmark", {
      headers: {
        "x-tenant-id": "tenant_demo",
        "x-roles": "institution_head"
      }
    });
    if (response.ok) {
      data = await response.json();
    }
  } catch (err) {
    console.warn("API Server offline, using fallback dummy datasets.", err);
  }

  const metricMappings = {
    jobdb_structuring_rate: 68,
    daily_evidence_activation: Math.min(100, 74 + (data.stats?.checkinsCount || 0) * 2),
    career_graph_coverage: 52,
    policy_guardrail_coverage: 85
  };

  document.querySelector("#metric-grid").innerHTML = data.benchmark.metrics.map(metric => {
    const ourVal = metricMappings[metric.code] ?? 0;
    
    return `
      <article class="metric-card benchmark-card">
        <div>
          <div class="metric-label">${metric.label}</div>
          <div class="benchmark-values">
            <div class="our-value">${ourVal}%</div>
            <div class="benchmark-range">
              <span>중간값: ${metric.median}%</span>
              <span>상위 25%: ${metric.topQuartile}%</span>
            </div>
          </div>
          <div class="benchmark-bar-container">
            <div class="benchmark-bar">
              <div class="bar-median" style="left: ${metric.median}%" title="중간값: ${metric.median}%"></div>
              <div class="bar-top" style="left: ${metric.topQuartile}%" title="상위 25%: ${metric.topQuartile}%"></div>
              <div class="bar-our" style="left: ${ourVal}%" title="우리 기관: ${ourVal}%"></div>
            </div>
          </div>
        </div>
        <div class="metric-note">${metric.interpretation}</div>
      </article>
    `;
  }).join("");

  document.querySelector("#two-column-section").style.display = "grid";
  
  const leftPanel = document.querySelector("#two-column-section").firstElementChild;
  leftPanel.innerHTML = `
    <h2>벤치마크 분석 코멘트</h2>
    <ul class="task-list">
      ${data.benchmark.demoNarrative.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;

  const rightPanel = document.querySelector("#two-column-section").lastElementChild;
  rightPanel.innerHTML = `
    <h2>직무기술서 설계 현황 (JobDB Wiki)</h2>
    <ul class="jobs-list">
      ${jobs.map(job => `
        <li class="job-item">
          <div class="job-header">
            <span>${job.title} (${job.jobSeries})</span>
            <span class="job-tasks-badge">원자 과업: ${job.tasksCount}개</span>
          </div>
          <div class="job-mission">${job.mission}</div>
        </li>
      `).join("")}
    </ul>
  `;
}

async function renderPersona(personaKey) {
  const jobdbWorkspace = document.querySelector("#jobdb-workspace");
  const primaryPanel = document.querySelector("#primary-panel");
  const metricGrid = document.querySelector("#metric-grid");
  const twoColumnSection = document.querySelector("#two-column-section");

  if (personaKey === "jobdb") {
    if (jobdbWorkspace) jobdbWorkspace.style.display = "block";
    if (primaryPanel) primaryPanel.style.display = "none";
    if (metricGrid) metricGrid.style.display = "none";
    if (twoColumnSection) twoColumnSection.style.display = "none";
    
    renderJobDBWiki();
    
    document.querySelectorAll(".persona-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.persona === personaKey);
    });
    return;
  }

  // Restore layout for regular personas
  if (jobdbWorkspace) jobdbWorkspace.style.display = "none";
  if (primaryPanel) primaryPanel.style.display = "grid";
  if (metricGrid) metricGrid.style.display = "grid";
  if (twoColumnSection) twoColumnSection.style.display = "grid";

  if (personaKey === "benchmark") {
    renderBenchmark();
    document.querySelectorAll(".persona-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.persona === personaKey);
    });
    return;
  }

  const leftPanel = document.querySelector("#two-column-section").firstElementChild;
  leftPanel.innerHTML = `
    <h2 id="mission-title">오늘의 미션</h2>
    <ul class="task-list" id="mission-list"></ul>
  `;

  const rightPanel = document.querySelector("#two-column-section").lastElementChild;
  rightPanel.innerHTML = `
    <h2>데이터 연계</h2>
    <ol class="data-flow" id="data-flow"></ol>
  `;

  const persona = personaHomes[personaKey];
  document.querySelector("#persona-title").textContent = persona.title;
  document.querySelector("#persona-hook").textContent = persona.hook;
  document.querySelector("#primary-panel").innerHTML = `
    <div>
      <h2>${persona.heroTitle}</h2>
      <p>${persona.heroText}</p>
    </div>
    <button class="primary-action" id="action-btn-main" type="button">${persona.action}</button>
  `;

  // Draw metrics
  if (personaKey === "employee") {
    await renderEmployeeMetrics();
  } else {
    document.querySelector("#metric-grid").innerHTML = persona.metrics
      .map(
        ([label, value, note]) => `
          <article class="metric-card">
            <div class="metric-label">${label}</div>
            <div class="metric-value">${value}</div>
            <div class="metric-note">${note}</div>
          </article>
        `
      )
      .join("");
  }

  document.querySelector("#mission-list").innerHTML = persona.missions
    .map((mission) => `<li>${mission}</li>`)
    .join("");

  document.querySelector("#data-flow").innerHTML = persona.flow
    .map((item) => `<li>${item}</li>`)
    .join("");

  // Bind employee action button
  const actionBtn = document.querySelector("#action-btn-main");
  if (personaKey === "employee" && actionBtn) {
    actionBtn.onclick = () => renderEmployeeCheckinForm();
  }

  // Bind manager check-in list
  if (personaKey === "manager") {
    renderManagerCheckinQueue();
  }

  document.querySelectorAll(".persona-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.persona === personaKey);
  });
}

async function renderEmployeeMetrics() {
  let checkinsCount = 0;
  try {
    const res = await fetch("http://localhost:3000/api/v1/dashboard/benchmark", {
      headers: {
        "x-tenant-id": "tenant_demo",
        "x-roles": "institution_head"
      }
    });
    if (res.ok) {
      const data = await res.json();
      checkinsCount = data.stats?.checkinsCount || 0;
    }
  } catch (err) {
    console.warn("Failed fetching dynamic checkin count for employee metric card", err);
  }

  const grid = document.querySelector("#metric-grid");
  if (grid) {
    grid.innerHTML = `
      <article class="metric-card">
        <div class="metric-label">이번 주 목표</div>
        <div class="metric-value">68%</div>
        <div class="metric-note">OKR 진행률</div>
      </article>
      <article class="metric-card">
        <div class="metric-label">성과증빙</div>
        <div class="metric-value" id="employee-evidence-metric">${14 + checkinsCount}건</div>
        <div class="metric-note">이번 달 누적</div>
      </article>
      <article class="metric-card">
        <div class="metric-label">커리어 진행</div>
        <div class="metric-value">+3.2</div>
        <div class="metric-note">직무숙련도 변화</div>
      </article>
      <article class="metric-card">
        <div class="metric-label">피드백</div>
        <div class="metric-value">2건</div>
        <div class="metric-note">확인 대기</div>
      </article>
    `;
  }
}

const sampleTasksForSelect = [
  { id: "task_1", name: "고준위방폐물 관리 기본계획 수립 지원 및 시행계획 작성" },
  { id: "task_2", name: "고준위방폐물 관리시설 부지선정 및 해외자료 조사" },
  { id: "task_3", name: "방사성폐기물 관련 정부정책 및 관련 법률 해석 지원" },
  { id: "task_4", name: "교육 훈련 계획 수립 및 교재 개발" }
];

function renderEmployeeCheckinForm() {
  const leftPanel = document.querySelector("#two-column-section").firstElementChild;
  if (!leftPanel) return;

  leftPanel.innerHTML = `
    <h2>3줄 체크인 작성 (Sample Form)</h2>
    <form id="checkin-form" style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
      <div>
        <label style="font-size: 12px; font-weight: 700; color: var(--muted); display: block; margin-bottom: 4px;">오늘 한 일 *</label>
        <textarea id="form-summary" required rows="3" style="width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px;" placeholder="오늘 완료한 업무를 3줄 내외로 간결하게 기술하세요."></textarea>
      </div>
      <div>
        <label style="font-size: 12px; font-weight: 700; color: var(--muted); display: block; margin-bottom: 4px;">연계 원자 과업 *</label>
        <select id="form-task-select" required style="width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px;">
          ${sampleTasksForSelect.map(t => `<option value="${t.id}">${t.name}</option>`).join("")}
        </select>
      </div>
      <div>
        <label style="font-size: 12px; font-weight: 700; color: var(--muted); display: block; margin-bottom: 4px;">장애 요소 및 지원 요청 (선택)</label>
        <input type="text" id="form-blocker" style="width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px;" placeholder="도움이 필요한 부분을 기록해 주세요." />
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--muted); display: block; margin-bottom: 4px;">성과 증빙명 *</label>
          <input type="text" id="form-evidence-title" required style="width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px;" placeholder="예: 시행계획 보고서" />
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--muted); display: block; margin-bottom: 4px;">증빙 파일/링크 *</label>
          <input type="text" id="form-evidence-url" required style="width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px;" placeholder="http://..." />
        </div>
      </div>
      <div style="display: flex; gap: 8px; margin-top: 6px;">
        <button type="submit" class="primary-action" style="flex-grow: 1; padding: 10px;">제출하기</button>
        <button type="button" id="form-cancel-btn" class="lang-toggle" style="padding: 10px 16px; border: 1px solid var(--border); border-radius: 6px;">취소</button>
      </div>
    </form>
  `;

  // Bind cancel
  const cancelBtn = leftPanel.querySelector("#form-cancel-btn");
  if (cancelBtn) {
    cancelBtn.onclick = () => renderPersona("employee");
  }

  // Bind submit
  const form = leftPanel.querySelector("#checkin-form");
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const summary = form.querySelector("#form-summary").value;
      const atomicTaskId = form.querySelector("#form-task-select").value;
      const blocker = form.querySelector("#form-blocker").value;
      const evTitle = form.querySelector("#form-evidence-title").value;
      const evUrl = form.querySelector("#form-evidence-url").value;

      try {
        const res = await fetch("http://localhost:3000/api/v1/work-okr/daily-checkins", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-tenant-id": "tenant_demo",
            "x-user-id": "user_employee_1",
            "x-roles": "employee",
            "x-org-ids": "org_strategy"
          },
          body: JSON.stringify({
            userId: "user_employee_1",
            organizationId: "org_strategy",
            atomicTaskId,
            summary,
            blocker: blocker || null,
            workflowState: "submitted",
            evidenceItems: [
              { title: evTitle, evidenceType: "document", externalRef: evUrl }
            ]
          })
        });
        if (res.ok) {
          alert("3줄 체크인과 성과 증빙이 성공적으로 제출되었습니다!");
          renderPersona("employee");
        } else {
          alert("체크인 제출에 실패했습니다. (API 서버 응답 에러)");
        }
      } catch (err) {
        console.error("Failed submitting checkin", err);
        alert("체크인 제출에 실패했습니다. (서버 연결 실패)");
      }
    };
  }
}

async function renderManagerCheckinQueue() {
  const rightPanel = document.querySelector("#two-column-section").lastElementChild;
  if (!rightPanel) return;

  rightPanel.innerHTML = `
    <h2>팀원 업무 체크인 검토</h2>
    <ul class="jobs-list" id="manager-checkin-list">팀원 체크인을 불러오는 중...</ul>
  `;

  let checkins = [];
  try {
    const res = await fetch("http://localhost:3000/api/v1/work-okr/daily-checkins?organizationId=org_strategy", {
      headers: {
        "x-tenant-id": "tenant_demo",
        "x-roles": "manager",
        "x-org-ids": "org_strategy"
      }
    });
    if (res.ok) {
      const dataJson = await res.json();
      checkins = dataJson.data || [];
    }
  } catch (err) {
    console.warn("Failed loading checkins for manager dashboard", err);
  }

  const listUl = rightPanel.querySelector("#manager-checkin-list");
  if (!listUl) return;

  if (checkins.length === 0) {
    listUl.innerHTML = `
      <li class="job-item" style="padding: 20px; text-align: center; color: var(--muted);">
        검토 대기 중인 신규 팀 체크인이 없습니다.
      </li>
    `;
    return;
  }

  listUl.innerHTML = checkins.map((c, i) => `
    <li class="job-item" style="border: 1px solid var(--border); padding: 16px; border-radius: 8px; margin-bottom: 12px; background: var(--surface);">
      <div class="job-header" style="border-bottom: 1px solid var(--border); padding-bottom: 8px; margin-bottom: 8px;">
        <span>👤 팀원: 김도윤 (경영기획)</span>
        <span class="similarity-pill high" style="font-size: 11px;">검토 대기</span>
      </div>
      <div style="font-size: 13px; line-height: 1.5; color: var(--muted); margin-bottom: 10px;">
        <strong>업무 요약:</strong> ${c.summary}
      </div>
      <div style="font-size: 12px; color: var(--muted); margin-bottom: 10px;">
        <strong>연계 과업 ID:</strong> ${c.atomicTaskId}
      </div>
      <div style="font-size: 12px; color: var(--muted); margin-bottom: 10px;">
        <strong>장애 요소:</strong> ${c.blocker || "없음"}
      </div>
      <div style="font-size: 12px; margin-bottom: 12px;">
        <strong>성과 증빙:</strong> 
        ${c.evidenceItems && c.evidenceItems.length > 0
          ? c.evidenceItems.map(item => `
              <a href="${item.externalRef}" target="_blank" style="color: var(--accent); font-weight: bold; text-decoration: underline;">
                📄 ${item.title}
              </a>
            `).join(", ")
          : "없음"
        }
      </div>
      <div style="display: flex; gap: 8px; margin-top: 8px;">
        <textarea id="feedback-${i}" style="flex-grow: 1; height: 36px; padding: 6px; font-size: 12px; border: 1px solid var(--border); border-radius: 4px;" placeholder="피드백 코멘트를 입력하세요 (선택)."></textarea>
        <button class="primary-action approve-feedback-btn" data-index="${i}" style="padding: 8px 12px; font-size: 12px;" type="button">승인</button>
      </div>
    </li>
  `).join("");

  listUl.querySelectorAll(".approve-feedback-btn").forEach(btn => {
    btn.onclick = () => {
      alert("성과 증빙이 정상 승인되었으며 피드백 알림이 발송되었습니다!");
      renderPersona("manager");
    };
  });
}

// SaaS JobDB Wiki module
let wikiJobs = [];
let activeWikiJob = null;
let wikiLangMode = "ko"; // "ko" (default) or "en"
let activeWikiDetailTab = "overview"; // overview, tasks, career, education

const fallbackJobsList = [
  { normalizedTitle: "고준위기획", normalizedTitleEn: "High-Level Waste Planning", jobSeries: "사업기획", baseDate: "24.09.23", taskCount: 14, totalJobSize: 12.5 },
  { normalizedTitle: "인력양성", normalizedTitleEn: "Human Resource Development", jobSeries: "사업기획", baseDate: "24.09.23", taskCount: 9, totalJobSize: 6.67 },
  { normalizedTitle: "중저준위기획", normalizedTitleEn: "Low-and-Medium Level Waste Planning", jobSeries: "사업기획", baseDate: "24.09.23", taskCount: 9, totalJobSize: 6.6 }
];

async function renderJobDBWiki() {
  document.querySelector("#persona-title").textContent = "직무기술서 Wiki (JobDB)";
  document.querySelector("#persona-hook").textContent = "공공기관 NCS 직무 표준 분류 정보 체계";

  // Bind Language Switcher Buttons
  const koBtn = document.querySelector("#lang-ko-btn");
  const enBtn = document.querySelector("#lang-en-btn");
  
  if (koBtn && enBtn) {
    koBtn.onclick = () => {
      wikiLangMode = "ko";
      koBtn.classList.add("active");
      enBtn.classList.remove("active");
      if (activeWikiJob) renderJobDetail(activeWikiJob);
    };
    enBtn.onclick = () => {
      wikiLangMode = "en";
      enBtn.classList.add("active");
      koBtn.classList.remove("active");
      if (activeWikiJob) renderJobDetail(activeWikiJob);
    };
  }

  // Load jobs list
  wikiJobs = fallbackJobsList;
  try {
    const response = await fetch("http://localhost:3000/api/v1/jobs", {
      headers: {
        "x-tenant-id": "tenant_demo",
        "x-roles": "institution_head"
      }
    });
    if (response.ok) {
      const resJson = await response.json();
      wikiJobs = resJson.jobs;
    }
  } catch (err) {
    console.warn("API Server offline, using fallback job list seed.", err);
  }

  renderWikiJobsSidebar(wikiJobs);

  // Search input binder
  const searchInput = document.querySelector("#wiki-search");
  if (searchInput) {
    searchInput.oninput = (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = wikiJobs.filter(job => 
        job.normalizedTitle.toLowerCase().includes(query) || 
        job.jobSeries.toLowerCase().includes(query) || 
        job.normalizedTitleEn.toLowerCase().includes(query)
      );
      renderWikiJobsSidebar(filtered);
    };
  }
}

function renderWikiJobsSidebar(jobs) {
  const ul = document.querySelector("#wiki-job-list-ul");
  if (!ul) return;

  if (jobs.length === 0) {
    ul.innerHTML = `<li style="padding: 12px; color: var(--muted); font-size: 13px;">검색 결과가 없습니다.</li>`;
    return;
  }

  ul.innerHTML = jobs.map(job => `
    <li class="wiki-job-list-item ${activeWikiJob && activeWikiJob.normalizedTitle === job.normalizedTitle ? "active" : ""}" data-title="${job.normalizedTitle}">
      <strong>${job.normalizedTitle}</strong>
      <div class="wiki-job-meta">
        <span>${job.jobSeries}</span>
        <span>과업: ${job.taskCount}개 (Size: ${job.totalJobSize})</span>
      </div>
    </li>
  `).join("");

  ul.querySelectorAll(".wiki-job-list-item").forEach(item => {
    item.onclick = async () => {
      const title = item.dataset.title;
      
      // Add active style immediately
      ul.querySelectorAll(".wiki-job-list-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // Fetch detail
      try {
        const response = await fetch(`http://localhost:3000/api/v1/jobs/${encodeURIComponent(title)}`, {
          headers: {
            "x-tenant-id": "tenant_demo",
            "x-roles": "institution_head"
          }
        });
        if (response.ok) {
          activeWikiJob = await response.json();
          renderJobDetail(activeWikiJob);
        }
      } catch (err) {
        console.warn("API Server offline, mapping fallback job details.", err);
        // Fallback detail mapping
        const jobBasic = wikiJobs.find(j => j.normalizedTitle === title);
        activeWikiJob = {
          normalizedTitle: jobBasic.normalizedTitle,
          normalizedTitleEn: jobBasic.normalizedTitleEn,
          jobSeries: jobBasic.jobSeries,
          baseDate: jobBasic.baseDate,
          jobPurpose: "국가법령 및 정책에 따라 전담기관으로서의 사업목표를 설정하고 이를 달성하기 위한 전략을 수립하여 업무를 수행한다.",
          jobPurposeEn: "Responsible for coordinating and planning strategic initiatives according to national policies and regulations.",
          legalBasis: "방사성폐기물 관리법, 원자력안전법",
          totalJobSize: jobBasic.totalJobSize,
          missions: [
            { order: 1, text: "국가 계획에 따른 시행계획 수립", textEn: "Formulate strategic implementation plans." },
            { order: 2, text: "원자력안전 및 방폐물 정책 수립 수검", textEn: "Handle regulatory reviews and policy validations." }
          ],
          atomicTasks: [
            { order: 1, taskGroup: "정책 수립 및 지원", subTask: "고준위방폐물 관리 기본계획 수립 지원 및 시행계획 수립", importance: 8, difficulty: 7.5, jobSize: 1.3, evidenceRequirement: "시행계획 수립 보고서" },
            { order: 2, taskGroup: "사업 기획", subTask: "관리시설 부지선정 및 해외자료 조사", importance: 9, difficulty: 8, jobSize: 1.5, evidenceRequirement: "부지선정 검토결과" }
          ],
          careerLinks: [
            { direction: "prior", targetTitle: "인력양성", similarity: "상" },
            { direction: "next", targetTitle: "중저준위기획", similarity: "중" }
          ],
          education: {
            requiredDegree: "대졸",
            recommendedMajors: ["원자력공학", "화학공학", "경영학"],
            courses: [
              { name: "방폐물 관련 법제교육", method: "온라인/오프라인" },
              { name: "프로젝트 매니저 양성 과정", method: "온라인/오프라인" }
            ]
          }
        };
        renderJobDetail(activeWikiJob);
      }
    };
  });
}

function renderJobDetail(job) {
  const panel = document.querySelector("#wiki-detail-panel");
  if (!panel) return;

  const isKo = wikiLangMode === "ko";
  const title = isKo ? job.normalizedTitle : job.normalizedTitleEn;
  const series = job.jobSeries;
  const baseDate = job.baseDate;

  // Calculate statistics
  const totalTasks = job.atomicTasks.length;
  const avgImportance = (job.atomicTasks.reduce((sum, t) => sum + t.importance, 0) / totalTasks).toFixed(1);
  const avgDifficulty = (job.atomicTasks.reduce((sum, t) => sum + t.difficulty, 0) / totalTasks).toFixed(1);

  panel.innerHTML = `
    <div class="detail-title-row">
      <div>
        <span class="eyebrow">${series} | ${baseDate} 기준</span>
        <h1 style="margin: 4px 0 0 0; font-size: 24px;">${title}</h1>
        ${!isKo ? `<div class="detail-title-en">KR: ${job.normalizedTitle}</div>` : ""}
      </div>
      <div>
        <span class="compliance-badge">${job.legalBasis}</span>
      </div>
    </div>

    <!-- Inner tabs for detail card -->
    <div class="detail-tabs">
      <button class="detail-tab ${activeWikiDetailTab === "overview" ? "active" : ""}" data-tab="overview" type="button">직무 개요 (Overview)</button>
      <button class="detail-tab ${activeWikiDetailTab === "tasks" ? "active" : ""}" data-tab="tasks" type="button">과업 및 잡사이즈 (Tasks & Job Size)</button>
      <button class="detail-tab ${activeWikiDetailTab === "career" ? "active" : ""}" data-tab="career" type="button">경력 경로 (Career Path)</button>
      <button class="detail-tab ${activeWikiDetailTab === "education" ? "active" : ""}" data-tab="education" type="button">학력 및 교육 (Education)</button>
    </div>

    <!-- Tab 1: Overview -->
    <div class="detail-pane ${activeWikiDetailTab === "overview" ? "active" : ""}" id="pane-overview">
      <h3 style="margin-bottom: 8px;">${isKo ? "직무 정의" : "Job Purpose"}</h3>
      <p style="color: var(--muted); line-height: 1.6; margin-bottom: 20px;">
        ${isKo ? job.jobPurpose : job.jobPurposeEn}
      </p>

      <h3>${isKo ? "직무 미션 (Missions)" : "Job Missions"}</h3>
      <ul class="task-list" style="padding-left: 20px;">
        ${job.missions.map(m => `
          <li>
            <strong>Mission ${m.order}:</strong> ${isKo ? m.text : m.textEn}
          </li>
        `).join("")}
      </ul>
    </div>

    <!-- Tab 2: Tasks & Job Size -->
    <div class="detail-pane ${activeWikiDetailTab === "tasks" ? "active" : ""}" id="pane-tasks">
      <div class="grid" style="grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 16px;">
        <article class="metric-card" style="padding: 10px;">
          <div class="metric-label">${isKo ? "누적 잡사이즈" : "Total Job Size"}</div>
          <div class="metric-value" style="font-size: 20px; color: var(--accent);">${job.totalJobSize}</div>
        </article>
        <article class="metric-card" style="padding: 10px;">
          <div class="metric-label">${isKo ? "평균 중요도" : "Avg Importance"}</div>
          <div class="metric-value" style="font-size: 20px;">${avgImportance} / 10</div>
        </article>
        <article class="metric-card" style="padding: 10px;">
          <div class="metric-label">${isKo ? "평균 난이도" : "Avg Difficulty"}</div>
          <div class="metric-value" style="font-size: 20px;">${avgDifficulty} / 10</div>
        </article>
      </div>

      <table class="task-grid-table">
        <thead>
          <tr>
            <th style="width: 50px;">Order</th>
            <th>${isKo ? "세부 과업 (Sub-task)" : "Sub-task"}</th>
            <th style="width: 80px;">${isKo ? "중요도" : "Imp"}</th>
            <th style="width: 80px;">${isKo ? "난이도" : "Diff"}</th>
            <th style="width: 100px;">Job Size</th>
            <th>${isKo ? "산출 증빙 매뉴얼" : "Expected Evidence Output"}</th>
          </tr>
        </thead>
        <tbody>
          ${job.atomicTasks.map(t => {
            const isHighLoad = t.importance >= 8 && t.difficulty >= 8;
            return `
              <tr>
                <td>${t.order}</td>
                <td>
                  ${t.subTask} 
                  ${isHighLoad ? `<span class="critical-badge" title="과부하 리스크 관리 필요">${isKo ? "고부하" : "High Load"}</span>` : ""}
                </td>
                <td>${t.importance}</td>
                <td>${t.difficulty}</td>
                <td>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span>${t.jobSize}</span>
                    <div class="task-progress-bg">
                      <div class="task-progress-fill" style="width: ${Math.min(100, (t.jobSize / 2.5) * 100)}%;"></div>
                    </div>
                  </div>
                </td>
                <td style="color: var(--accent-dark); font-weight: 500;">
                  <span style="font-size: 11px; background: #e0f2fe; padding: 2px 6px; border-radius: 4px; color: #0369a1;">📄 ${t.evidenceRequirement}</span>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>

    <!-- Tab 3: Career Path -->
    <div class="detail-pane ${activeWikiDetailTab === "career" ? "active" : ""}" id="pane-career">
      <h3 style="margin-bottom: 12px;">${isKo ? "직무 이동 경로 맵" : "Career Path Flow Map"}</h3>
      
      <div class="path-node-container">
        <!-- Prior Jobs -->
        <div class="path-node-row">
          <span style="color: var(--muted); font-size: 12px; font-weight: 700; width: 80px;">Prior Jobs:</span>
          ${job.careerLinks.filter(l => l.direction === "prior").map(l => `
            <div class="path-node">
              <span>${l.targetTitle}</span>
              <span class="similarity-pill ${l.similarity === "상" ? "high" : "med"}">${isKo ? "유사도" : "Match"}: ${l.similarity}</span>
            </div>
          `).join("") || `<span style="color: var(--muted); font-size: 12px;">선행 직무가 기록되지 않았습니다.</span>`}
        </div>

        <!-- Current Active Job -->
        <div class="path-node-row" style="justify-content: center; margin: 10px 0;">
          <div class="path-arrow" style="transform: rotate(90deg); margin-bottom: 6px;">▲</div>
          <div class="path-node" style="border-color: var(--accent); background: #eefdfb; font-weight: 700; font-size: 15px; padding: 10px 20px;">
             🎯 ${isKo ? job.normalizedTitle : job.normalizedTitleEn}
          </div>
          <div class="path-arrow" style="transform: rotate(90deg); margin-top: 6px;">▼</div>
        </div>

        <!-- Next Jobs -->
        <div class="path-node-row">
          <span style="color: var(--muted); font-size: 12px; font-weight: 700; width: 80px;">Next Jobs:</span>
          ${job.careerLinks.filter(l => l.direction === "next").map(l => `
            <div class="path-node">
              <span>${l.targetTitle}</span>
              <span class="similarity-pill ${l.similarity === "상" ? "high" : "med"}">${isKo ? "유사도" : "Match"}: ${l.similarity}</span>
            </div>
          `).join("") || `<span style="color: var(--muted); font-size: 12px;">이동 가능 후행 직무가 지정되지 않았습니다.</span>`}
        </div>
      </div>

      <h4 style="margin: 16px 0 8px 0;">${isKo ? "이동 가능성 분석" : "Transition Recommender Insights"}</h4>
      <p style="color: var(--muted); font-size: 13px; line-height: 1.5;">
        ${isKo 
          ? `본 직무는 동일 직군 내의 선행 원자 과업 구조와 평균 82.5%의 유사성을 지니고 있으며, 과업 중요도 분석 기준에 따라 인접 기술 역량그룹으로의 직무 이동 추천도가 높은 것으로 집계되었습니다.`
          : `This profile demonstrates an 82.5% structural task similarity correlation coefficient with adjacent job families. Transition recommendations are dynamically optimized for parallel task linkages.`
        }
      </p>
    </div>

    <!-- Tab 4: Education & Majors -->
    <div class="detail-pane ${activeWikiDetailTab === "education" ? "active" : ""}" id="pane-education">
      <div class="grid" style="grid-template-columns: 1fr 2fr; gap: 14px;">
        <article class="panel" style="padding: 14px;">
          <h3 style="margin-bottom: 8px;">${isKo ? "필수 학력 요건" : "Required Degree"}</h3>
          <div class="compliance-badge" style="font-size: 15px; margin: 0 0 16px 0;">🎓 ${job.education.requiredDegree}</div>

          <h3>${isKo ? "추천 학사 전공" : "Recommended Majors"}</h3>
          <ul class="task-list" style="padding-left: 20px; font-size: 13px;">
            ${job.education.recommendedMajors.map(major => `<li>${major}</li>`).join("")}
          </ul>
        </article>

        <article class="panel" style="padding: 14px;">
          <h3 style="margin-bottom: 8px;">${isKo ? "직무 교육 이수 로드맵" : "Professional Course Roadmap"}</h3>
          <table class="task-grid-table" style="margin-top: 0;">
            <thead>
              <tr>
                <th>${isKo ? "교육과정명" : "Course Title"}</th>
                <th>${isKo ? "교육방법" : "Teaching Method"}</th>
              </tr>
            </thead>
            <tbody>
              ${job.education.courses.map(c => `
                <tr>
                  <td><strong>${c.name}</strong></td>
                  <td><span style="font-size: 11px; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: var(--muted);">${c.method}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
      </div>
    </div>
  `;

  // Bind tab buttons inside detailed view
  panel.querySelectorAll(".detail-tab").forEach(tab => {
    tab.onclick = () => {
      activeWikiDetailTab = tab.dataset.tab;
      renderJobDetail(job);
    };
  });
}

document.querySelectorAll(".persona-tab").forEach((tab) => {
  tab.addEventListener("click", () => renderPersona(tab.dataset.persona));
});

renderPersona("employee");
