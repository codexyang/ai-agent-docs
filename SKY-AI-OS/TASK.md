# TASK

VERSION: SAOS v2.1  
Last updated: 2026-06-25

## Current

Resolve DR-Test database connection for `kyzwwotjunouzegyfqgz`.

## Priority

P1

## Owner

Codex

## Blocked

Two user-provided session pooler URLs were each tested once. Both failed to return a PostgreSQL identity response and did not produce a clear password-authentication error. Stop here until the connection method/password is confirmed.

## Next

1. Confirm whether Supabase dashboard SQL Editor can run `select current_database(), current_user;`.
2. If dashboard works, reset or confirm the DR-Test DB password.
3. Provide one confirmed connection method: direct, session pooler, or transaction pooler.
4. Re-run read-only identity check.
5. If PASS, generate pre-clean dump, SHA256, Storage manifest, and pre-clean report.

## Scope

DR-Test only.

## Explicitly Out of Scope

- Production
- Backup
- Staging
- Development
- DROP / DELETE / ALTER / TRUNCATE
- Migration
