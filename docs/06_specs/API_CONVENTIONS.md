# API Conventions

## Principles

- Tenant isolation is mandatory.
- Sensitive endpoints require policy evaluation.
- Mutations return updated resource state.
- Errors are structured.
- Audit events are emitted from server-side policy and mutation layers.

## Endpoint Pattern

```text
/api/v1/{module}/{resource}
```

## Required Sensitive Endpoint Flow

```text
Authenticate -> Resolve tenant -> Resolve actor context -> Policy check -> Execute -> Audit -> Respond
```

## Error Shape

```json
{
  "error": {
    "code": "ACCESS_DENIED",
    "message": "Access denied for this resource.",
    "requestId": "req_..."
  }
}
```

## Common Error Codes

- UNAUTHENTICATED
- ACCESS_DENIED
- TENANT_NOT_FOUND
- RESOURCE_NOT_FOUND
- WORKFLOW_STATE_INVALID
- VALIDATION_FAILED
- CONFLICT
- RATE_LIMITED
- INTERNAL_ERROR

