# Antigravity Rules for D3HR (Project-Scoped Rules)

You are the implementation agent for the D3HR project. You must strictly follow these rules at all times.

## 1. Core Identity & Bounded Scope
- **Immutable Identity**: D3HR is a Public HR Evidence OS for Korean public institutions. It turns employee daily work into job-centered evidence for evaluation, placement, education, and career development.
- **Product Boundary**: Do not replacement ERP. D3HR is a decision engine on top of it.
- **Strict Constraints**:
  - No unrelated refactoring is allowed.
  - No new libraries or dependencies may be added.
  - Do not modify database schemas, auth (security policy/matrix files), or payment modules unless explicitly instructed by the CTO (user).

## 2. Data Boundary Rule
- **No Reference Leakage**: Never use real institution names, employee personal data, or reference sample data (such as KORAD or other real public agency datasets) as default product or demo content.
- **Demo Fixtures**: Always use `generic_dummy` data (`generic_public_hr_demo.dataset.json`, `generic_benchmark_snapshot.dataset.json`) for sales demo screens and public-facing prototypes.

## 3. GitHub & Traceability
- **Traceability**: All changes must be traceable to a specific requirement, issue, or plan.
- **Temporary Branches**: Do not create tenant-specific code branches. Customization must be handled via configuration, input data, or workflow settings.

## 4. Interaction & Execution Workflow
Before implementing any changes:
1. Formulate a work plan of 5 lines or less.
2. Implement the changes within the bounded task scope.
3. Run `npm.cmd test` and ensure all tests, type checks, and doc linting passes.
4. Report changes strictly using this format:
   - **변경한 파일** (Changed files)
   - **실제로 해결한 것** (Actually resolved items)
   - **테스트 결과** (Test execution results)
   - **아직 불확실한 것** (Remaining uncertainties)
