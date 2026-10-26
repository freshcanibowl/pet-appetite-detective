# Companion Care UI V2 — Design and acceptance notes

This is a standalone visual iteration inspired by CARLi's care-oriented product principles, **not** a copy of an official CARLi design system or logo.

## Principles
- Invisible Data: begin with a caring question, not a spreadsheet.
- Progressive Capture: quick food-acceptance choice; optional stool/behavior details.
- Visual Memory: seven-day bar view alongside exact observations.
- Daily Return: calm progress language, no guilt or streak pressure.

## Design tokens
- Canvas `#fbfaf7`; ink `#243c47`; teal `#21877c`; soft mint `#eaf6ef`; coral accent `#e3a481`.
- Native fonts, mobile-first responsive layout, visible focus states.

## Data and IP boundaries
- Preserves `pet-appetite-detective-v1` localStorage key and `logic.js` validation/summarization.
- No CAIOS API, credentials, data, trademarks or production modifications.
- Synthetic demo must remain labeled as synthetic.
- This is an observational journal, not a diagnostic or medical tool.

## Manual browser acceptance
1. Open localhost:4173; confirm visual layout on desktop and mobile.
2. Select Day 1, Ate well, save; confirm 1/7 progress and row.
3. Add optional details; confirm visible in day row.
4. Update same day to Skipped; confirm no duplicate row and changed bar.
5. Load synthetic demo; confirm seven days and disclaimer.
6. Export JSON; inspect schema, seven entries, observedDays and meanAppetite.
7. Refresh; confirm persistence. Clear; confirm zero days.
8. Keyboard-tab through all choices, buttons, details and export.

## Competition gate
Official Learn Skill Pack installed is not proof that this code was generated through its complete workflow. Rebuild or validate from a fresh folder with real agent execution evidence before claiming full contest compliance.
