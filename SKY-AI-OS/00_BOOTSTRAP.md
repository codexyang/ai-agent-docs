# SKY AI Operating System — Bootstrap

Version: SAOS v2.0  
Last updated: 2026-06-25

## Highest Principle

任何 Agent 在開始工作前，都必須先確認自己目前所處的環境（Development、Staging、Production、Backup 或 DR-Test），並以最小必要範圍進行操作；若知識庫已有答案，優先引用，不得重新探索整個專案。

## Mandatory Startup Order

Every Agent must read these files first, in this order:

1. `00_BOOTSTRAP.md`
2. `01_MASTER_INDEX.md`
3. `03_DATABASE_MAP.md`
4. `knowledge/CURRENT_STATE.md`
5. `08_PROJECT_STATUS.md`
6. `09_AGENT_HANDOFF.md`

Only after this sequence may an Agent inspect task-specific files.

## Repository Scanning Rule

Agents must not scan the entire repository by default.

Allowed:

- Read the SAOS knowledge base first.
- Inspect only the files required for the current task.
- Use targeted search terms when the knowledge base is insufficient.

Not allowed unless explicitly justified:

- Full repository crawling.
- Blind migration discovery against Production.
- Searching for secrets across the whole workspace.
- Running broad write operations.

## Environment Confirmation

Before any action, output or internally verify:

- Current Git branch.
- Target environment.
- Whether database access is required.
- Whether the target is Production, Backup, Staging, Development, or DR-Test.
- Whether the action is read-only or write-capable.

## Database Safety

Production:

- Never connect for development work.
- Never run migration, db push, reset, seed, truncate, delete, or write test.
- Deploy only after approval, backup, rollback tag, and validation.

Backup:

- Never use as a development database.
- Never overwrite without a backup procedure.

Staging / Development:

- Can be used for testing within approved scope.
- Must not be assumed to contain Production-equivalent row data.

DR-Test:

- Used only for Restore Drill and disaster recovery validation.
- May be cleaned only after manifest, backup, and explicit approval.

## Standard Output Format

Each completed task should return:

```text
STATUS
PASS / BLOCKED

SUMMARY
One sentence.

FILES
Changed files.

DATABASE
Development / Staging / Production / Backup / DR-Test / None

NEXT
Recommended next step.

HANDOFF
What the next Agent should know.
```

