## Requirements (EARS)

- WHEN the user opens the web app, THE SYSTEM SHALL render a Todo/Notes list and form without runtime errors.
- WHEN the app loads, THE SYSTEM SHALL apply the persisted theme (light/dark/system) before React hydration.
- WHEN the user navigates via keyboard, THE SYSTEM SHALL provide a visible focus indicator and a skip-to-main link.
- WHEN the user submits the add form with a title, THE SYSTEM SHALL create a new todo/note and store it locally.
- WHEN the user edits or marks a todo done, THE SYSTEM SHALL update the stored item and reflect changes in the list.
- WHEN the user toggles theme, THE SYSTEM SHALL persist the preference in localStorage and update data-theme immediately.
- IF lint, typecheck, or build run, THEN THE SYSTEM SHALL complete without errors across all workspaces.
