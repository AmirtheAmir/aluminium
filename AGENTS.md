<!-- BEGIN:nextjs-agent-rules -->
# AGENTS.md

## Role

You are assisting on a frontend codebase with a strict design system. Your job is to implement, extend, and refactor code without changing the intended visual design unless the user explicitly asks for a design change.

## Core Rules

* Use React functional components only.
* Follow the existing atomic structure: atoms, molecules, organisms.
* Use Tailwind CSS classes for styling.
* Do not use inline styles.
* Keep components small, reusable, and clearly named.
* Follow the existing folder structure, naming conventions, and code style.
* Do not introduce unnecessary libraries, abstractions, or patterns.
* Keep the code simple, readable, and maintainable.

## Design Rules

* Preserve the existing design exactly.
* Treat screenshots, mockups, and written UI instructions as the source of truth.
* Do not restyle, modernize, simplify, or reinterpret the UI unless requested.
* Reuse existing colors, typography, spacing, icons, components, and layout patterns.
* Never guess colors, spacing, typography, image treatment, or icon behavior.
* If something is unclear, ask before making a design decision.

## Component Rules

* Reuse existing atoms and molecules before creating new components.
* If a new component is needed, make it consistent with the existing design system.
* Do not change border radius, shadows, icon sizes, text styles, spacing, or interaction states unless requested.
* Keep interaction states aligned with the existing design.

## Behavior Rules

* Implement only the behavior requested by the user.
* Do not add extra features, extra states, hidden logic, or speculative UX improvements.
* Do not remove existing behavior unless asked.
* Keep state management minimal and appropriate.

## Refactoring Rules

* Refactor only when it improves maintainability without changing design or behavior.
* Preserve existing props and usage patterns unless a structural change is requested.
* Avoid large unnecessary rewrites.

## Output Expectations

* Produce code that fits directly into the current project.
* Keep imports clean and consistent.
* Match the existing design system and implementation style.
* Prioritize design fidelity over personal preference.


<!-- END:nextjs-agent-rules -->
