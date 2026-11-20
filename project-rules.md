# Lab 04 Project Rules and Contracts

## Identity

- Student: Đặng Hoài An
- Student ID: 24520039

## General Lab Workflow

- Follow Contract, Fail Test, Implement and Refactor.
- Use atomic commits with conventional messages.
- Record actual AI failures with evidence.
- Do not fabricate failures, measurements or commit history.

## Existing Stack

- React 19, Vite, JavaScript and React Router 7.
- Use createRoot and StrictMode.
- Keep one BrowserRouter in src/main.jsx.
- Use the existing Vitest and React Testing Library setup.
- Keep application text, code and commit messages in English.

## Exercise 1.1 Contract

- Lazy-load src/pages/PersonDetail.jsx on access to /person.
- Declare the lazy component at module scope in App.jsx.
- PersonDetail must default-export the actual page component.
- Do not statically import PersonDetail in application modules.
- Use a separate skeleton through Suspense.
- Keep navigation outside the Suspense boundary.
- Expose one polite loading status and a busy profile region.
- Clear the busy state when the real profile is rendered.
- Hide decorative skeleton content from assistive technology.
- Share profile geometry and reserve avatar space.
- Support reduced motion and visible keyboard focus.
- Do not introduce a production loading delay.
- Treat CLS = 0 as a browser verification target.

## Exercise 1.2.1 Direct Requirements

- Use Routes and Route.
- Declare route content through the element prop.
- Use a shared Layout containing navigation and Outlet.
- Use NavLink className callbacks receiving isActive.

## Exercise 1.2.1 Routing Contract

- Parent route: path="/" with element={<Layout />}.
- Index child: Home at /.
- Child path="about": About at /about.
- Child path="person": existing lazy profile at /person.
- Child path="*": preserve the general not-found page.
- Use relative child route paths.
- Render exactly one main element, owned by Layout.
- Render the matching child through Outlet inside main.
- Keep navigation and main mounted across child navigation.
- Use Link or NavLink for internal navigation.
- Every NavLink must have a valid to prop.
- Use end on the Home NavLink.
- Active links use nav-link--active and aria-current="page".
- Preserve the optional Detail prop in App as the existing test seam.
- Production uses the default lazy detail component.

## Implementation Choices

- Keep the existing global stylesheet.
- Add a small Layout stylesheet for the active class.
- Keep the existing 600px responsive breakpoint.
- Keep the fixed sample profile and semantic definition list.
- Extract Home, About and NotFound into page modules.

## Acceptance

- Existing Exercise 1.1 tests remain green.
- Test Home, About navigation, direct About entry and active links.
- Test layout persistence during pending and resolved detail loading.
- Test, lint and production build pass.
- Verify Back, Forward, direct local refresh and keyboard navigation.
- Inspect Console for unresolved application errors and warnings.

## Scope Limits

- No React Router v5 syntax.
- No second BrowserRouter and no RouterProvider.
- No currentPage state used as a routing substitute.
- No dynamic IDs, useParams or people.find.
- No ID-based not-found handling from Exercise 1.2.2.
- No forms, forum, backend or Homework.
- Suspense does not provide import-error recovery.
- Suspense does not automatically wait for fetch calls in useEffect.
