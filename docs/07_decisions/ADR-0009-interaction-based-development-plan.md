# ADR-0009: Use Interaction-Based Development Planning

## Status

Accepted

## Context

D3HR is being designed through rapid founder-CTO interaction. This creates strong product insight but also creates failure risk if decisions remain only in conversation.

The founder's corrections often reveal constitutional rules, such as separating reference samples from product content.

## Decision

D3HR will use interaction-based development planning:

- founder signals are treated as product evidence
- CTO interpretation must become issue, ADR, spec, test, or release note
- failure-prevention signals become tracked GitHub issues
- implementation cannot outrun documentation
- next build slices are planned from the latest interaction plus constitution checks

## Consequences

- Conversation is not discarded.
- Important corrections become durable project memory.
- The development plan can evolve without losing previous decisions.
- GitHub becomes the translation layer from vision and anxiety into executable work.

