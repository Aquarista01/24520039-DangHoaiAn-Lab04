# Exercise 1.1 Contract

## Identity

- Student: Đặng Hoài An
- Student ID: 24520039

## Direct Exercise Requirements

- Load the detail page module on route access with React lazy.
- Render a separate skeleton through Suspense.
- Match skeleton and content geometry.
- Target CLS = 0 and verify it in the browser.
- Expose loading through aria-busy and aria-live on actual DOM nodes.

## General Lab Workflow

- Follow Contract, Fail Test, Implement and Refactor.
- Use atomic commits with conventional messages.
- Record actual AI implementation failures with evidence.

## Implementation Choices

- React 19, Vite 7, JavaScript and React Router 7.
- BrowserRouter with fixed routes `/` and `/person`.
- One eager sample person object.
- A global stylesheet and a 600px responsive breakpoint.
- Vitest, jsdom and React Testing Library.
- Semantic definition lists for the sample profile.
- Check the layout at 375px and desktop.

## Module and Component Contract

- Declare the lazy component at module scope in App.jsx.
- PersonDetail.jsx must default-export the actual page component.
- Do not statically import PersonDetail in application modules.
- PersonDetail receives a person object.
- The object contains name, role, avatarSrc, avatarAlt and facts.
- Each fact contains label and value.
- Keep navigation outside the Suspense boundary.
- Use the optional Detail prop in App only as a test seam.
- Production uses the default lazy component.

## Loading Contract

- Pending: one polite status and aria-busy="true" on the profile region.
- Keep the status outside the busy region.
- Hide decorative skeleton content from assistive technology.
- Ready: remove the fallback and render aria-busy="false".
- Reserve avatar space and share layout rules.
- Support visible focus and reduced motion.
- Do not introduce a production loading delay.

## Acceptance

- Pending, resolved and route-navigation tests pass.
- Lint and production build pass.
- Verify on-demand chunks in the production preview.
- Verify layout shifts in Chrome.
- Verify direct refresh, keyboard access and no horizontal overflow.
- Do not report unmeasured CLS as zero.

## Scope Limits

- No dynamic IDs, useParams or people.find.
- No full master-detail interface, forms, forum or Homework.
- Suspense does not provide import-error recovery.
- Suspense does not automatically wait for fetch calls in useEffect.
