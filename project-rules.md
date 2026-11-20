# Lab 04 Project Rules and Contracts

## Identity

- Student: Đặng Hoài An
- Student ID: 24520039

## General Workflow

- Follow Contract, Fail Test, Implement and Refactor.
- Use atomic commits with conventional messages.
- Record actual AI failures with evidence.
- Do not fabricate test results, profiler results or commit history.

## Existing Architecture

- React 19, Vite, JavaScript and React Router 7.
- Keep createRoot, StrictMode and one BrowserRouter.
- Shared Layout owns the single main element.
- Keep Home, About, People and the general not-found page.
- Keep /people and /people/:id with the shared people dataset.
- Preserve useParams, guarded people.find and semantic profile metadata.
- Preserve the single lazy PersonDetail module and matching skeleton.
- Keep /person as the existing compatibility redirect.
- Verify layout and CLS in the browser instead of assuming success.

## Exercise 1.3 Route and Scope

- Add /form inside the existing shared layout.
- Keep FormContext scoped to SimpleForm.
- Do not add a backend, database, forum API or Homework.

## Form Data Contract

- Raw values contain fullName, email and age as strings.
- Full name is required after trimming whitespace.
- Email is required and uses a basic format check.
- Age is required and must be a positive safe integer.
- Keep raw input editable; do not convert age during onChange.
- Normalize only after a valid submit.
- Normalize fullName by trimming and collapsing whitespace.
- Normalize email by trimming.
- Normalize age to a number.

## State and Context Contract

- SimpleForm owns values.
- Use functional immutable updates.
- Context provides values and field update handlers.
- Context also provides derived errors and isValid.
- touched and submitted control feedback visibility.
- Do not store errors or isValid in state.
- Do not use effects for validation or parent-child synchronization.
- Avoid unnecessary memoization.
- The custom hook must reject use outside the provider.

## InputField Contract

- Use one useId call in each InputField instance.
- Connect label and input with htmlFor and id.
- Give each error its own ID.
- aria-invalid reflects the displayed error.
- aria-describedby references an existing error only.
- Forward the explicitly supported HTML props.
- Do not allow caller props to override controlled values or ARIA.
- Preserve visible keyboard focus.

## Submit and Inspector Contract

- Use a real form and a submit button.
- Use noValidate with custom validation.
- Prevent page reload.
- Invalid submits do not create or replace the submitted snapshot.
- Valid submits create a normalized snapshot.
- Editing values does not modify the snapshot.
- ShowData renders dl, dt and dd with stable field keys.
- Preserve zero values and explicitly represent empty strings.
- Announce each successful submission through a polite status.
- Do not use window.alert.

## Verification

- Use the existing Vitest and Testing Library setup.
- Write and run failing tests before each milestone implementation.
- Preserve the previous routing and lazy-loading tests.
- Test initial values, validation, IDs, ARIA and submit behavior.
- Run test, lint and build.
- Inspect state and commits with React Developer Tools.
- Keep StrictMode enabled.
- Do not equate render invocations with committed updates.

## Functional Commits

- feat: form context
- feat: input field validation
- feat: inspector output
