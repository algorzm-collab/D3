import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
WORKSPACE_ROOT = ROOT.parent
TEXT_PATH = WORKSPACE_ROOT / "work" / "korad_general_pdf_extract" / "korad_general_extracted_text.txt"
OUT_DIR = ROOT / "packages" / "database" / "seeds"
DOC_OUT = ROOT / "docs" / "02_modules" / "jobdb" / "KORAD_GENERAL_JOB_DESCRIPTION_ANALYSIS.md"


SECTION_MARKERS = [
    ("job_info", r"1\.\s*직무정보"),
    ("job_definition", r"2\.\s*직무정의"),
    ("job_mission", r"3\.\s*직무미션"),
    ("task_content", r"4\.\s*과업\(Task\)\s*내용"),
    ("competency_requirement", r"5\.\s*요구\s*직무역량"),
    ("education_requirement", r"6\.\s*학력/이수과목"),
    ("certification_recommendation", r"7\.\s*권장\s*자격증"),
    ("job_fit_flags", r"8\.\s*적합\s*직무"),
    ("career_path", r"9\.\s*직무\s*추천\s*경로"),
    ("job_kpi", r"10\.\s*직무\s*KPI"),
]


def clean_text(text: str) -> str:
    text = re.sub(r"\n-+\s*\d+\s*-+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def split_jobs(text: str):
    pattern = re.compile(r"(?m)^(\d+)\.\s+(.+?)\s+\[직무기술서\]\s*$")
    matches = list(pattern.finditer(text))
    jobs = []
    for idx, match in enumerate(matches):
        start = match.start()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(text)
        jobs.append(
            {
                "jobNo": int(match.group(1)),
                "title": match.group(2).strip(),
                "rawBlock": clean_text(text[start:end]),
            }
        )
    return jobs


def section_spans(block: str):
    found = []
    for key, pattern in SECTION_MARKERS:
        match = re.search(pattern, block)
        if match:
            found.append((match.start(), match.end(), key))
    found.sort()

    spans = {}
    for idx, (_start, marker_end, key) in enumerate(found):
        end = found[idx + 1][0] if idx + 1 < len(found) else len(block)
        spans[key] = clean_text(block[marker_end:end])
    return spans


def parse_job_info(text: str):
    compact = " ".join(text.split())
    info = {}

    series_match = re.search(r"직렬\s+(.+?)\s+직무명", compact)
    title_match = re.search(r"직무명\s+(.+?)\s+기준일", compact)
    date_match = re.search(r"(\d{2}\.\d{2}\.\d{2})", compact)

    if series_match:
        info["jobSeries"] = series_match.group(1).strip()
    if title_match:
        info["jobTitle"] = title_match.group(1).strip()
    if date_match:
        info["baseDate"] = date_match.group(1)
    return info


def parse_missions(text: str):
    missions = []
    pattern = re.compile(r"미션\s*(\d+)\s*(.*?)(?=미션\s*\d+|$)", re.S)
    for match in pattern.finditer(text):
        mission_text = clean_text(" ".join(match.group(2).split()))
        if mission_text:
            missions.append({"order": int(match.group(1)), "text": mission_text})
    if not missions and text:
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        missions = [{"order": idx + 1, "text": line} for idx, line in enumerate(lines)]
    return missions


def parse_recommended_certifications(text: str):
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    certs = []
    skip_words = ["자격증명", "직무 관련성", "높음", "보통", "낮음", "비고"]
    for line in lines:
        if any(word in line for word in skip_words):
            continue
        if "○" in line or "기사" in line or "면허" in line or "자격" in line:
            certs.append({"raw": line})
    return certs


def parse_fit_flags(text: str):
    compact = " ".join(text.split())
    return {
        "raw": text,
        "wagePeakJob": "임금피크제" in compact and "○" in compact.split("임금피크제")[-1][:20],
        "openJob": "개방형" in compact and "○" in compact.split("개방형")[-1][:20],
    }


def count_task_rows(text: str):
    count = 0
    for line in text.splitlines():
        if re.search(r"\s\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s*$", line):
            count += 1
    return count


def to_seed_job(job):
    spans = section_spans(job["rawBlock"])
    info = parse_job_info(spans.get("job_info", ""))
    title = info.get("jobTitle") or job["title"]
    job_series = info.get("jobSeries")
    base_date = info.get("baseDate")

    return {
        "sourceOrder": job["jobNo"],
        "rawTitle": f"{title} 직무기술서",
        "normalizedTitle": title,
        "jobSeries": job_series,
        "baseDate": base_date,
        "enrichmentStatus": "field_values_started",
        "sections": {
            "jobInfo": spans.get("job_info", ""),
            "jobDefinition": spans.get("job_definition", ""),
            "jobMission": spans.get("job_mission", ""),
            "taskContent": spans.get("task_content", ""),
            "competencyRequirement": spans.get("competency_requirement", ""),
            "educationRequirement": spans.get("education_requirement", ""),
            "certificationRecommendation": spans.get("certification_recommendation", ""),
            "jobFitFlags": spans.get("job_fit_flags", ""),
            "careerPath": spans.get("career_path", ""),
            "jobKpi": spans.get("job_kpi", ""),
        },
        "parsed": {
            "missions": parse_missions(spans.get("job_mission", "")),
            "taskRowEstimate": count_task_rows(spans.get("task_content", "")),
            "recommendedCertifications": parse_recommended_certifications(
                spans.get("certification_recommendation", "")
            ),
            "fitFlags": parse_fit_flags(spans.get("job_fit_flags", "")),
        },
        "fieldValueMap": {
            "job_series": job_series,
            "base_date": base_date,
            "job_title": title,
            "job_purpose": spans.get("job_definition", ""),
            "job_mission": spans.get("job_mission", ""),
            "job_components": spans.get("task_content", ""),
            "task_importance": spans.get("task_content", ""),
            "task_difficulty": spans.get("task_content", ""),
            "job_size": spans.get("task_content", ""),
            "required_competency": spans.get("competency_requirement", ""),
            "education_requirement": spans.get("education_requirement", ""),
            "license_or_certificate": spans.get("certification_recommendation", ""),
            "job_fit_flags": spans.get("job_fit_flags", ""),
            "career_path": spans.get("career_path", ""),
            "prior_job": spans.get("career_path", ""),
            "next_job": spans.get("career_path", ""),
            "performance_management_item": spans.get("job_kpi", ""),
        },
    }


def write_analysis_doc(seed_jobs, text):
    titles = "\n".join(
        f"- {job['sourceOrder']}. {job['normalizedTitle']} ({job.get('jobSeries') or '직렬 미확정'}, "
        f"기준일 {job.get('baseDate') or '미확정'}, 과업행 추정 {job['parsed']['taskRowEstimate']})"
        for job in seed_jobs
    )

    doc = f"""# KORAD 2024 General Job Description Analysis

## Source

- File: `한국원자력환경공단 2024년 일반직 직무기술서.pdf`
- Pages: 224
- Extracted text chars: {len(text)}
- Parsed jobs: {len(seed_jobs)}
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

{titles}

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
"""
    DOC_OUT.write_text(doc, encoding="utf-8")


def main():
    text = TEXT_PATH.read_text(encoding="utf-8")
    jobs = split_jobs(text)
    seed_jobs = [to_seed_job(job) for job in jobs]
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    seed = {
        "sourceDocument": {
            "id": "source_korad_2024_general_job_descriptions_pdf",
            "title": "한국원자력환경공단 2024년 일반직 직무기술서.pdf",
            "institution": "KORAD",
            "sourceType": "received_project_material",
            "documentType": "structured_job_descriptions",
            "contentClass": "reference_sample",
            "usageBoundary": "schema_parser_validation_not_product_content",
            "tenantScopeRule": "must be loaded only into an authorized tenant or local reference workspace",
            "salesUseRule": "use only as anonymized pattern or explicitly approved institution-specific reference",
            "productContentRule": "must not ship as default D3HR content",
            "extractedPages": 224,
            "sourceCompleteness": "job_description_body",
            "enrichmentRequired": True,
        },
        "seedPolicy": {
            "jobLevel": "general",
            "enrichmentStatus": "field_values_started",
            "versioningRule": "preserve extracted raw sections and convert section values into versioned JobDB field values",
            "timeSeriesRule": "track baseDate, first_seen_at, field version changes, and later enrichment events",
            "atomicDecompositionRule": "sections are seeds; tasks, competencies, learning, certificates, career links, and KPIs become atomic rows in later parser versions",
        },
        "jobs": seed_jobs,
    }

    (OUT_DIR / "korad_2024_general_job_descriptions.seed.json").write_text(
        json.dumps(seed, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    write_analysis_doc(seed_jobs, text)
    print(json.dumps({"jobs": len(seed_jobs), "out": str(OUT_DIR)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
