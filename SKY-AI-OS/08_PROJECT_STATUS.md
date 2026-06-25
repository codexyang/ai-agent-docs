# Project Status

Version: SAOS v2.0  
Last updated: 2026-06-25

## Current Focus

Build a stable AI Operating System knowledge base and prepare DR-Test / Restore Drill without risking Production.

## Current DR-Test Status

Project Ref: `kyzwwotjunouzegyfqgz`  
Purpose: SKY Shopping DR-Test / Restore Drill candidate  
Project name observed: `DR-test of sky-shopping`  
Status: blocked on DB connection validation  
Database changes performed: none

## Completed

- SAOS v2.0 knowledge structure created.
- Existing DR-Test inventory summarized.
- Five-environment model defined.
- Production safety rules documented.

## Attempted on 2026-06-25

- Direct URL template confirmed from dashboard:
  - `postgresql://postgres:[REDACTED]@db.kyzwwotjunouzegyfqgz.supabase.co:5432/postgres`
- Session pooler URL format confirmed from dashboard:
  - `postgresql://postgres.kyzwwotjunouzegyfqgz:[REDACTED]@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres`
- Two user-provided session pooler passwords were each tested once.
- Result: no PostgreSQL identity response; no successful connection; no DB writes.

## Pending

- Confirm valid DR-Test DB password / connection path.
- Run pre-clean `pg_dump`.
- Generate SHA256 checksum.
- Generate Storage manifest.
- Produce pre-clean report.
- Get explicit approval before any cleanup or rename.

## Blockers

DR-Test connection has not yet returned a successful `select current_database(), current_user;`.

Direct Supabase DB connection may require a connection path compatible with the local network. The dashboard direct URL uses:

`postgresql://postgres:[REDACTED]@db.kyzwwotjunouzegyfqgz.supabase.co:5432/postgres`

No password is stored here.
