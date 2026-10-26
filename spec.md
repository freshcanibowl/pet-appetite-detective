# Technical Specification

Status: PROVISIONAL; must be reviewed through Devpost Learn Skill Pack.

Vanilla HTML/CSS/JS. No backend, dependencies, external calls or production integration.
Data: {day:1..7, appetite:0..3, stool:string, behavior:string}; one entry per day.
Storage key: pet-appetite-detective-v1. All displayed user notes use textContent to prevent HTML injection.
Export JSON: {schema, disclaimer, generatedAt, entries, summary}.
Tests: Node built-in test runner covers pure summary calculation and validation.
