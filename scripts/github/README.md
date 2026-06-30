# GitHub Bootstrap Scripts

These scripts configure GitHub as the D3HR configuration-management system.

## Prerequisite

Authenticate GitHub CLI:

```powershell
gh auth login
```

Or set a short-lived fine-grained token in the local shell:

```powershell
$env:GITHUB_TOKEN="..."
```

## Usage

After creating and pushing the repository:

```powershell
.\scripts\github\bootstrap-labels.ps1 -Repo "OWNER/d3hr"
.\scripts\github\bootstrap-milestones.ps1 -Repo "OWNER/d3hr"
```

Do not commit tokens or local `.env` files.

