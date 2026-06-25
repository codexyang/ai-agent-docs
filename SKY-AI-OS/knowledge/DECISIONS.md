# Decisions

Version: SAOS v2.0

## Architecture Decisions

- Production is never used for direct AI database writes.
- Production changes require backup, rollback, and validation.
- DR-Test is dedicated to Restore Drill, not normal development.
- Development and Staging must remain independent from Production.
- Backup is not a development database.
- Staging parity means functional/schema/UI/API parity, not identical row data.
- Agents must read knowledge before exploring the repository.

## Documentation Decisions

- Major decisions must be recorded here.
- Handoffs must be recorded in `09_AGENT_HANDOFF.md`.
- Current state must be recorded in `knowledge/CURRENT_STATE.md`.

