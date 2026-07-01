# DR-Test Phase 1 Report

Date: 2026-07-01  
Project Ref: `kyzwwotjunouzegyfqgz`  
Project URL: `https://kyzwwotjunouzegyfqgz.supabase.co`  
Environment: SKY Shopping DR-Test / Restore Drill  
Mode: Read-only verification

## Status

WARNING — DR-Test database is usable for Restore Drill validation, but Edge Functions / external service references cannot be fully proven from CLI without a Supabase access token or third-party dashboards.

No Production, Backup, Staging, Development, Vercel env, Supabase project setting, or external service setting was modified.

## Safety Result

| Rule | Status |
| --- | --- |
| Read-only only | PASS |
| DROP / DELETE / UPDATE / INSERT / ALTER / TRUNCATE | PASS — not executed |
| Migration | PASS — not executed |
| Project modification | PASS — not modified |
| Env modification | PASS — not modified |
| Vercel modification | PASS — not modified |
| Production modification | PASS — not touched |

## Checklist

| Item | Status | Evidence |
| --- | --- | --- |
| Project Identity | PASS | Project ref `kyzwwotjunouzegyfqgz`; name observed as `DR-test DB-sky-shopping` / `DR-test of sky-shopping`. |
| Database Version | PASS | PostgreSQL 17.6 on aarch64 Linux. |
| Extensions | PASS | `pg_stat_statements`, `pgcrypto`, `plpgsql`, `supabase_vault`, `uuid-ossp`. |
| Schemas | PASS | `auth`, `extensions`, `graphql`, `graphql_public`, `information_schema`, `pg_catalog`, `pg_toast`, `pgbouncer`, `public`, `realtime`, `storage`, `vault`. |
| Tables | PASS | 50 non-system table/view entries found; public application tables verified. |
| Views | PASS | `extensions.pg_stat_statements`, `extensions.pg_stat_statements_info`, `vault.decrypted_secrets`. |
| Functions | PASS | 94 functions found, all Supabase/system extension functions. |
| Triggers | PASS | 7 triggers found; only realtime/storage system triggers. |
| Policies (RLS) | PASS | `public.logistics_store`: `service role can manage logistics store`, cmd `ALL`. |
| Auth Users | PASS | `auth.users` count = 0. |
| Storage Buckets | PASS | `product-images`, public = true. |
| Storage Objects | PASS | `product-images` object count = 8. |
| Edge Functions | WARNING | Supabase CLI requires access token. Previous dashboard observation showed no deployed functions, but current CLI proof is unavailable. |
| Cron | PASS | No `pg_cron`, `pg_net`, `http` extension; no `cron` / `net` schema found. |
| Webhook | PASS | No webhook/http/cron/notify-like routines in `public`, `storage`, or `auth`. |
| API Keys Reference | WARNING | Vercel env and local env references checked for DR-Test ref; none found. Cannot independently inspect every external third-party dashboard. |

## Public Application Table Counts

| Table | Estimated Rows |
| --- | ---: |
| `Admin` | 1 |
| `AdminLog` | 59 |
| `Category` | 161 |
| `NotificationLog` | 1 |
| `Order` | 18 |
| `OrderItem` | 18 |
| `Product` | 123 |
| `Shipment` | 1 |
| `SiteStats` | 1 |
| `Supplier` | 10 |
| `TrackingEvent` | 3 |
| `logistics_store` | 4 |

## Vercel Reference Check

Read-only Vercel env pull checked these projects and environments for `kyzwwotjunouzegyfqgz`, its Supabase URL, and its pooler host:

| Vercel Project | Production | Preview | Development |
| --- | --- | --- | --- |
| `sky-shopping-v1` | No DR-Test ref | No DR-Test ref | No DR-Test ref |
| `sky-logistics-system` | No DR-Test ref | No DR-Test ref | No DR-Test ref |
| `pegasustour-v1-5` | No DR-Test ref | No DR-Test ref | No DR-Test ref |

## Local Reference Check

Local `.env.local` / `.env.example` files checked in linked worktrees did not contain the DR-Test ref or DR-Test Supabase URL.

## Baseline Artifacts

Pre-clean baseline already exists:

- `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump`
- `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump.sha256`
- `dr-test-backups/20260627_184133/storage_buckets_manifest.tsv`
- `dr-test-backups/20260627_184133/storage_objects_manifest.tsv`
- `dr-test-backups/20260627_184133/storage_manifest.sha256`
- `dr-test-backups/20260627_184133/PRE_CLEAN_REPORT.md`

## Decision

DR-Test Phase 1 is sufficient to continue planning Restore Drill. Before destructive cleanup or actual restore overwrite, resolve the two WARNING items or explicitly accept them as known limitations.

