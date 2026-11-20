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


## Keyboard Check Ran Before Home Rendered

### Observation

The first automated Chrome run reached the production preview keyboard
check and failed the assertion that the first Tab focused the skip link.

### Evidence

Chrome 157.0.8103.79 returned false for the comparison between
document.activeElement and the skip link. The automation sent Tab after
page.goto() without waiting for the Home heading to appear.

### Correction

Wait for the Home heading before sending Tab. Reload the document to reset
focus before testing the profile link.

### Verification

The full Chrome rerun passed the keyboard checks on both dev and preview.
The production run also measured zero CLS in all four scenarios.
