---
name: update-docs
description: Check and update docs-like files after implementing a feature or when implementation may be out of sync with documentation. Use after code changes that affect behavior, APIs, routes, commands, architecture, workflows, or agent guidance; also use when asked to audit docs drift across README, AGENTS, CLAUDE, skills, MDX, and other docs files.
---

# Update Docs

Keep documentation aligned with the implementation. Use this after a feature lands, after refactors that change public behavior or workflows, or when the user asks whether docs are out of sync.

## What Counts As Docs

Check relevant docs-like files, including:

- Root docs: `README.md`, `AGENTS.md`, `CLAUDE.md` only when the change is significant enough for broad project guidance
- App/package docs: `apps/**/README.md`, `packages/**/README.md`
- Content docs: `apps/website/content/**/*.mdx`
- Agent skills: `.agents/skills/**/SKILL.md`, `.claude/skills/**/SKILL.md`
- Inline architecture comments or JSDoc when they explain workflows users or agents rely on
- Config comments that describe behavior, commands, routes, or conventions

## Workflow

1. Understand what changed.
   - Identify new or changed behavior, file paths, APIs, routes, commands, props, env vars, registry names, and workflows.
   - Decide whether the change affects users, docs authors, agents, maintainers, or only private implementation details.

2. Search for stale references.
   - Search docs-like files for old terms, paths, components, commands, examples, and workflow descriptions.
   - Include skill files when the change affects how agents should work.
   - Include localized MDX pages when the corresponding English page changes.

3. Update only relevant docs.
   - Keep wording short and practical.
   - Prefer updating existing sections over adding duplicate sections.
   - Do not document private implementation details unless maintainers or agents need them.
   - Keep examples runnable and aligned with the current code.
   - Do not bloat general docs with every implementation detail. For `README.md`, `AGENTS.md`, and `CLAUDE.md`, update only durable, high-signal changes such as public behavior, architecture, setup, workflow, or conventions.
   - Put narrow details in focused docs, content pages, JSDoc, or skill files instead of top-level docs.

4. Preserve docs style.
   - Match the nearby heading style, tone, and level of detail.
   - Keep localized content equivalent in meaning, not necessarily word-for-word.
   - For skill files, keep instructions direct and action-oriented.

5. Validate.
   - Run formatting after edits.
   - Run relevant type/docs checks when MDX or generated docs are touched.
   - Use lints/diagnostics for changed docs and related code when available.

## Drift Checklist

Before finishing, check whether the change requires updates to:

- Architecture descriptions and file tree diagrams
- Public usage examples and imports
- MDX authoring rules and component props
- New routes, API endpoints, or middleware behavior
- Setup, build, test, lint, or format commands
- New config files, env vars, or registry/package wiring steps
- Agent workflows in skill files
- New shared types, helpers, or conventions that future work must follow

## Response

Summarize:

- Which docs were updated
- Which docs were checked but did not need changes, if useful
- Validation run
- Any docs drift that remains unresolved
