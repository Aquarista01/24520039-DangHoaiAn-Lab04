# Lab 04 Task Decomposition

## Exercise 1.1: Existing Scope

1. Define the lazy profile contract.
2. Test pending and resolved module states.
3. Implement the lazy profile route and Suspense skeleton.
4. Verify accessibility, chunk loading and layout stability.

## Exercise 1.2.1: Current Scope

1. Review the existing project, branch and baseline checks.
2. Define the nested routing and shared layout contract.
3. Add failing tests for the new routing behavior.
4. Extract Layout, Home and the existing not-found page.
5. Add About and declare nested child routes.
6. Add NavLink active callbacks and reuse existing styling.
7. Preserve the lazy profile route and its existing tests.
8. Review the refactor and run test, lint and build.
9. Verify navigation, browser history, direct refresh and keyboard access.

## Commit Plan

- docs: define the nested routing contract.
- test: add failing nested routing tests.
- feat: router layout.
- Additional fix commits only when actual verification requires changes.

These groups describe actual work.
They do not impose a separate commit count for Exercise 1.2.1.

## Sprint 1 Boundary

The Sprint 1 functional commit "feat: router layout" belongs to this work.

The functional commit "feat: detail route handling" will be completed
with Exercise 1.2.2, including its dynamic detail requirements.
