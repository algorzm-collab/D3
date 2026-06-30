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

function renderPersona(personaKey) {
  const persona = personaHomes[personaKey];
  document.querySelector("#persona-title").textContent = persona.title;
  document.querySelector("#persona-hook").textContent = persona.hook;
  document.querySelector("#primary-panel").innerHTML = `
    <div>
      <h2>${persona.heroTitle}</h2>
      <p>${persona.heroText}</p>
    </div>
    <button class="primary-action" type="button">${persona.action}</button>
  `;

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

  document.querySelector("#mission-list").innerHTML = persona.missions
    .map((mission) => `<li>${mission}</li>`)
    .join("");

  document.querySelector("#data-flow").innerHTML = persona.flow
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.querySelectorAll(".persona-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.persona === personaKey);
  });
}

document.querySelectorAll(".persona-tab").forEach((tab) => {
  tab.addEventListener("click", () => renderPersona(tab.dataset.persona));
});

renderPersona("employee");

