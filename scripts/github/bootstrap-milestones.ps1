param(
  [Parameter(Mandatory=$true)]
  [string]$Repo
)

$milestones = @(
  @{ title="v0.0-foundation"; description="Constitution, module boundaries, policies, SOP, ADRs, GitHub governance." },
  @{ title="v0.1-mvp"; description="NCS-to-JobDB, job wiki, access, audit, daily check-in, evidence dashboard." },
  @{ title="v0.2-career"; description="Career progress, learning recommendations, manager feedback expansion." },
  @{ title="v0.3-community"; description="Veteran system, Q&A, benchmark library foundation." },
  @{ title="v1.0-pilot"; description="Pilot-ready stable release for one public institution." }
)

foreach ($milestone in $milestones) {
  gh api "repos/$Repo/milestones" `
    -f title="$($milestone.title)" `
    -f description="$($milestone.description)" `
    -f state="open" `
    --silent
}

