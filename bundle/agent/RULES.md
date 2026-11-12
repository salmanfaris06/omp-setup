# Sticky Rules

- **Language**: ALWAYS communicate in Indonesian using adapted ASD-STE100 principles (short sentences, unambiguous terms, active voice, no figurative language).
- **Ambiguity**: Clarify ambiguities immediately via `ask`; NEVER proceed on assumptions.
- **Action Gates**: MUST obtain explicit user approval via `ask` before executing local servers, running browser tests, or performing git commit and push operations.
- **Temporal Freshness**: Check system date before running web searches or generating date-sensitive output.
- **Tool Selection**: MUST use `read` to view files, `edit` to modify existing files, and `write` to create new files. NEVER use `eval` (JavaScript/Bun) for file inspection, file editing, or file writing; use `eval` ONLY for browser automation (`browser`), REPL calculations, or isolated in-memory unit evaluations.

## Codebase Memory — Graph First

- **Scope**: MUST read `skill://codebase-memory` before code discovery, analysis, diagnosis, review, dependency tracing, or change-impact analysis. Follow its workflows and evidence tiers; Verify is the default.
- **Project**: At session start, after compaction, or when switching repositories, use `list_projects` and `index_status` to select the project whose absolute root contains the working directory. Index an unindexed repository before relying on graph evidence.
- **Discovery**: MUST start code searches and structural analysis with codebase-memory MCP. Use `search_graph`/`search_code` for discovery, `trace_path` for relationships, `get_code_snippet` for definitions, and `query_graph`/`get_architecture` for broader analysis when needed.
- **Evidence**: Batch all evidence paths into `check_index_coverage`; include relevant scopes for negative or exhaustive claims. Verify material claims against source and complete relevant pagination. Clean coverage or empty search results do not prove completeness or absence.
- **Fallback**: Use direct source read/grep for verification, unsupported or missing coverage, stale indexes, and MCP failures. Disclose the reason and unresolved limitations. Continue safe work without presenting source-only findings as verified graph evidence.
- **Refresh**: After each completed batch of repository changes, MUST synchronize the affected project's index with `index_repository` before further graph-based analysis or handing off results. Preserve the project's indexing scope and settings. Wait for indexing to finish, then check `index_status` and coverage for changed paths. A watcher notification alone is not proof of synchronization.
- **Git Boundaries**: Before and after an approved commit or push, check index freshness against the current source and Git state; re-index when either changed. Include changes made by Git hooks. These checks do not authorize commit or push.
- **Refresh Failure**: If indexing fails or freshness cannot be established, use source fallback for safe work and explicitly report that the index is not synchronized, including the blocker. Never claim successful synchronization without a completed index operation and status evidence.
- **Delegation**: Pass the exact project, evidence tier, freshness, checked paths/scopes, and coverage limitations to subagents. The main agent owns index mutations; read-only profiles report refresh needs instead of mutating the index.
- **Update Meaning**: Updating codebase memory means refreshing repository indexes, not upgrading the MCP executable. Binary upgrades and stopping other sessions require a separate user request or approval.
