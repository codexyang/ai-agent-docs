# Current State

Version: SAOS v2.0  
Last updated: 2026-06-25

## Verified

- Production, Backup, Staging, Development, and DR-Test are treated as separate roles.
- Production is protected and must not be modified by AI Agents.
- Staging and Development are separate from Production.
- DR-Test target is `kyzwwotjunouzegyfqgz`.
- DR-Test direct connection template is:

`postgresql://postgres:[REDACTED]@db.kyzwwotjunouzegyfqgz.supabase.co:5432/postgres`

## Not Yet Verified

- Current working DR-Test DB password.
- Full storage manifest after valid connection.
- Full pre-clean report after valid connection.

## Current Operational Mode

Read-only / documentation / DR-Test preparation.

