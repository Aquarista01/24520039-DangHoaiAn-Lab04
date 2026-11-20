# Lab 04 Project Rules and Contracts

## Identity

- Student: Đặng Hoài An
- Student ID: 24520039

## General Workflow

- Follow Contract, Fail Test, Implement and Refactor.
- Use atomic commits with conventional messages.
- Record actual AI failures with evidence.
- Do not fabricate failures, measurements or commit history.

## Existing Stack

- React 19, Vite, JavaScript and React Router 7.
- Keep createRoot and StrictMode.
- Keep one BrowserRouter in src/main.jsx.
- Use the existing Vitest and React Testing Library setup.
- Keep code, interface text and commit messages in English.

## Preserved Exercise 1.1 Contract

- Lazy-load the single PersonDetail page module.
- Declare lazy at module scope in App.jsx.
- Do not statically import PersonDetail in application modules.
- Keep a separate Suspense skeleton.
- Keep navigation outside the Suspense boundary.
- Expose one polite loading status outside the busy region.
- Clear busy state when content is ready.
- Hide skeleton decorations from assistive technology.
- Match profile and skeleton geometry.
- Reserve avatar space and support reduced motion.
- Do not introduce production loading delays.
- Verify CLS in the browser instead of assuming zero.

## Preserved Exercise 1.2.1 Contract

- Use Routes, Route and element props.
- Shared Layout owns the single main element.
- Layout renders child routes through Outlet.
- NavLink uses className callbacks with isActive.
- Preserve Home, About and the general not-found page.

## Exercise 1.2.2 Direct Requirements

- Use desktop Grid columns: minmax(280px, 1fr) 2fr.
- Change to one column on narrow screens.
- Read the person ID with useParams.
- Find the record with people.find.
- Check the lookup result before accessing person properties.
- Render a person-not-found state for unknown IDs.
- Render profile metadata with dl, dt and dd.

## Data Contract

- Use one shared people array.
- Each record has a unique stable string ID, name and role.
- Avatar and additional facts are optional.
- Reuse the existing featuredPerson data for the first record.
- Do not generate IDs during render.
- Do not use array indexes as list keys.

## Component Contract

- PeopleLayout receives people.
- It renders an accessible People navigation and an Outlet.
- Each person uses NavLink, a stable key and an active callback.
- PersonDetail receives the same people array.
- URL parameters determine the selected record.
- Do not synchronize selectedPerson state with the URL.

## Route Contract

- /: Home.
- /about: About.
- /people: directory and selection prompt.
- /people/:id: lazy detail inside PeopleLayout.
- /person: replace navigation to /people/24520039.
- Other unmatched URLs: the existing general not-found page.

## Loading and Error States

- Select the loading skeleton using the target URL ID.
- Keep both navigation regions visible during detail loading.
- Unknown IDs have a matching pending fallback and final message.
- A missing-record guard is not a React Error Boundary.
- A client-side not-found view does not imply HTTP status 404.
- Suspense does not provide import-error recovery.

## Verification

- Update existing tests when their route contract changes.
- Test the directory, selection, URL, active links and missing IDs.
- Preserve loading, accessibility and shared-layout regression tests.
- Test, lint and build must pass.
- Check desktop, 375px, long text and keyboard navigation.
- Verify local refresh, history and production chunk loading.

## Scope

- No form engine, forum API, backend or Homework.
