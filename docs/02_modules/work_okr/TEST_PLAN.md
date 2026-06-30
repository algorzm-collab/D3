# Test Plan: Work & OKR

## Permission Tests

- Employee can create own check-in.
- Employee cannot create another user's check-in.
- Manager can read scoped team submitted check-ins.
- Manager cannot read outside organization scope.
- Institution head sees aggregate only.
- System operator cannot read restricted content by default.

## Workflow Tests

- Draft can be edited by owner.
- Submitted record is visible to scoped manager.
- Evidence transition into evaluation use requires policy-controlled workflow.

## Audit Tests

- Restricted evidence creation emits audit event when required.
- Sensitive evidence read emits read_sensitive audit event.
- Export emits audit event.

