# AI Failure Audit

## Component Prop Incorrectly Reported as Unused

### Observation

During author-side verification of the previous guide version,
ESLint reported the Detail component prop as unused although
it was rendered in JSX.

### Evidence

Command: npm run lint

Diagnostic:
'Detail' is assigned a value but never used  no-unused-vars

The earlier implementation used this prop in PersonDetailRoute.jsx.
The revised guide places the lazy route in App.jsx.

### Cause

The original rule configuration set varsIgnorePattern but omitted
argsIgnorePattern for uppercase component parameters.

### Correction

Add argsIgnorePattern: '^[A-Z_]' to the no-unused-vars configuration.

### Verification

Author-side lint passed after correcting the previous guide version.

This entry does not claim that the failure occurred on the student's
Windows computer.

Expected failing contract tests are TDD evidence, not AI failures.
