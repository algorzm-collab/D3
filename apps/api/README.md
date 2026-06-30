# API App

Backend API service.

## Required Request Flow

```text
Authenticate -> Resolve tenant -> Resolve actor context -> Policy check -> Execute -> Audit -> Respond
```

## Rule

Sensitive endpoints cannot access or mutate data before policy evaluation.

