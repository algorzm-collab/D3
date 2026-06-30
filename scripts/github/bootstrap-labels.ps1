param(
  [Parameter(Mandatory=$true)]
  [string]$Repo
)

$labels = @(
  @{ name="type:feature"; color="0E8A16"; description="Product feature" },
  @{ name="type:bug"; color="D73A4A"; description="Bug or regression" },
  @{ name="type:docs"; color="0075CA"; description="Documentation change" },
  @{ name="type:policy"; color="5319E7"; description="Policy or governance change" },
  @{ name="type:security"; color="B60205"; description="Security or privacy issue" },
  @{ name="type:research"; color="FBCA04"; description="Research or competitive analysis" },
  @{ name="type:ux"; color="C2E0C6"; description="User experience" },
  @{ name="type:db"; color="1D76DB"; description="Database or migration" },
  @{ name="type:api"; color="0052CC"; description="API contract" },
  @{ name="type:admin"; color="7057FF"; description="Admin and operations" },

  @{ name="module:identity-access"; color="BFD4F2"; description="Identity and access module" },
  @{ name="module:jobdb"; color="BFD4F2"; description="JobDB module" },
  @{ name="module:work-okr"; color="BFD4F2"; description="Work and OKR module" },
  @{ name="module:performance"; color="BFD4F2"; description="Performance evidence module" },
  @{ name="module:career-learning"; color="BFD4F2"; description="Career and learning module" },
  @{ name="module:placement-workforce"; color="BFD4F2"; description="Placement and workforce module" },
  @{ name="module:evidence-pack"; color="BFD4F2"; description="Public HR Evidence Pack module" },
  @{ name="module:community-benchmark"; color="BFD4F2"; description="Community and benchmark module" },
  @{ name="module:admin-operations"; color="BFD4F2"; description="Admin and operations module" },

  @{ name="priority:p0"; color="B60205"; description="Critical" },
  @{ name="priority:p1"; color="D93F0B"; description="High" },
  @{ name="priority:p2"; color="FBCA04"; description="Normal" },

  @{ name="phase:foundation"; color="C5DEF5"; description="v0.0 foundation" },
  @{ name="phase:mvp"; color="C5DEF5"; description="MVP" },
  @{ name="phase:phase2"; color="C5DEF5"; description="Phase 2" }
)

foreach ($label in $labels) {
  gh label create $label.name --repo $Repo --color $label.color --description $label.description --force
}

