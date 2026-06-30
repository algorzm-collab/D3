# Policy Package

Owns access-control contracts and evaluation logic.

## Access Decision Formula

```text
role + org_scope + data_sensitivity + workflow_state + cycle + delegation = allow/deny
```

## Rule

No sensitive API may bypass policy evaluation.

