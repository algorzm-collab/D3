# KORAD 2024 General Job Description Analysis

## Source

- File: `한국원자력환경공단 2024년 일반직 직무기술서.pdf`
- Pages: 224
- Extracted text chars: 134450
- Parsed jobs: 35
- Base date pattern: `24.09.23`

## Interpretation

This source is a structured job-description body, not a simple job list. For D3HR it is seed material for the core JobDB, career graph, performance indicators, learning recommendations, workforce planning, and benchmark packs.

The source must never be treated as final truth. It is the first evidence layer. Every extracted value must keep the raw section, source document id, extraction date, version, and later enrichment history.

## Repeating Form

Each job generally repeats this structure:

1. 직무정보: 직렬, 직무명, 기준일
2. 직무정의: job purpose
3. 직무미션: mission statements
4. 과업(Task) 내용: tasks, sub-tasks, importance, difficulty, JOB-SIZE
5. 요구 직무역량: common competencies, technical competencies, competency elements
6. 학력/이수과목: education and learning course candidates
7. 권장 자격증: recommended license or certificate candidates
8. 적합 직무: wage-peak/open-job flags
9. 직무 추천 경로: prior and next job graph
10. 직무 KPI: performance-management item and metric seed

## Parsed Job List

- 1. 고준위기획 (사업기획, 기준일 24.09.23, 과업행 추정 14)
- 2. 인력양성 (사업기획, 기준일 24.09.23, 과업행 추정 9)
- 3. 중저준위기획 (사업기획, 기준일 24.09.23, 과업행 추정 9)
- 4. 처분시설운영기획 (사업기획, 기준일 24.09.23, 과업행 추정 8)
- 5. 안전기획 (품질안전, 기준일 24.09.23, 과업행 추정 11)
- 6. 안전관리 (품질안전, 기준일 24.09.23, 과업행 추정 8)
- 7. 품질보증 (품질안전, 기준일 24.09.23, 과업행 추정 11)
- 8. 방사선안전관리 (처분시설운영, 기준일 24.09.23, 과업행 추정 12)
- 9. 환경방사선관리 (처분시설운영, 기준일 24.09.23, 과업행 추정 9)
- 10. 방폐물검사 (처분시설운영, 기준일 24.09.23, 과업행 추정 13)
- 11. 방폐물분석 (처분시설운영, 기준일 24.09.23, 과업행 추정 5)
- 12. 방폐물관리 (처분시설운영, 기준일 24.09.23, 과업행 추정 18)
- 13. 부지조사 (처분시설운영, 기준일 24.09.23, 과업행 추정 15)
- 14. 계통운영 (처분시설운영, 기준일 24.09.23, 과업행 추정 12)
- 15. 계통설비유지보수 (처분시설운영, 기준일 24.09.23, 과업행 추정 16)
- 16. 건설·인허가관리 (건설관리, 기준일 24.09.23, 과업행 추정 10)
- 17. 설계관리 (건설관리, 기준일 24.09.23, 과업행 추정 11)
- 18. 공사관리 (건설관리, 기준일 24.09.23, 과업행 추정 13)
- 19. 공학적방벽특성평가 (방폐물기술, 기준일 24.09.23, 과업행 추정 13)
- 20. 부지특성평가 (방폐물기술, 기준일 24.09.23, 과업행 추정 11)
- 21. 방폐물특성평가 (방폐물기술, 기준일 24.09.23, 과업행 추정 11)
- 22. 감사 (경영기획, 기준일 24.09.23, 과업행 추정 10)
- 23. 전략기획 (경영기획, 기준일 24.09.23, 과업행 추정 16)
- 24. 디지털전환 (경영기획, 기준일 24.09.23, 과업행 추정 10)
- 25. 조직예산 (경영기획, 기준일 24.09.23, 과업행 추정 10)
- 26. 재무회계 (경영관리, 기준일 24.09.23, 과업행 추정 9)
- 27. 인사관리 (경영관리, 기준일 24.09.23, 과업행 추정 12)
- 28. 총무 (경영관리, 기준일 24.09.23, 과업행 추정 23)
- 29. 노무복지 (경영관리, 기준일 24.09.23, 과업행 추정 21)
- 30. 정보보안 (경영관리, 기준일 24.09.23, 과업행 추정 14)
- 31. 민간성장 (경영관리, 기준일 24.09.23, 과업행 추정 8)
- 32. 자산운용 (기금운용, 기준일 24.09.23, 과업행 추정 14)
- 33. 기금관리 (기금운용, 기준일 24.09.23, 과업행 추정 14)
- 34. 대외협력 (소통협력, 기준일 24.09.23, 과업행 추정 17)
- 35. 홍보 (소통협력, 기준일 24.09.23, 과업행 추정 14)

## D3HR Decomposition Rule

The unit of capture is not only `job`. D3HR decomposes each job into source document, job unit, section, field value, atomic row, version event, and downstream decision.

| Source Section | D3HR Fields | Downstream Use |
|---|---|---|
| 직무정보 | `job_series`, `job_title`, `base_date` | job registry, versioning, tenant benchmark |
| 직무정의 | `job_purpose` | role clarity, evidence pack, onboarding |
| 직무미션 | `job_mission` | daily OKR prompt, mission alignment |
| 과업(Task) 내용 | `job_components`, `task_importance`, `task_difficulty`, `job_size` | workload survey, staffing model, AI impact model |
| 요구 직무역량 | `required_competency`, `required_knowledge`, `required_skill`, `required_attitude` | competency diagnosis, learning recommendation |
| 학력/이수과목 | `education_requirement`, `development_package` | career development, learning marketplace |
| 권장 자격증 | `license_or_certificate` | specialist track, credential gap |
| 적합 직무 | `job_fit_flags`, `talent_type` | veteran role, open position, redeployment |
| 직무 추천 경로 | `career_path`, `prior_job`, `next_job` | career graph, placement recommendation |
| 직무 KPI | `performance_management_item`, `measurement_method`, `target_or_standard` | performance evidence, public-sector evaluation pack |

## Next Parsing Depth

The next parser iteration must split the raw sections into atomic rows:

- task group, sub-task, importance, difficulty, JOB-SIZE
- common competency, technical competency, definition, competency element
- course title, learning method, required education level
- certificate title, relevance level, issuer or note
- prior job, next job, similarity strength
- KPI task, KPI name, metric definition

## Product Implication

This document is the strongest hook against legacy ERP. ERP stores personnel records. D3HR turns job descriptions into living decision infrastructure: daily work, career movement, performance evidence, learning, workforce planning, and inter-institution benchmarking.
