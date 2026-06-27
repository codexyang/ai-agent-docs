# MEMORY CACHE

VERSION: SAOS v2.1  
Last updated: 2026-06-25

## Fast Facts

Branch: `main`  
Latest SAOS commit before current task: `0dfc76f`  
Current mode: `AUTO`  
Agent level: `L0` for DB, `L1` for docs  

## Database

Target: DR-Test  
Project Ref: `kyzwwotjunouzegyfqgz`  
Project Name observed: `DR-test of sky-shopping`  
Supabase URL: `https://kyzwwotjunouzegyfqgz.supabase.co`

## Current Checkpoint

SAOS v2.1 added. DR-Test Dashboard SQL read-only verification completed on 2026-06-27. No DB write performed.

## Verified via Dashboard SQL

- `current_database`: `postgres`
- `current_user`: `postgres`
- metadata tables result count: 47
- storage bucket: `product-images`, public `true`
- storage object count: `product-images` = 8
- auth users: 0
- extensions: `pg_stat_statements`, `pgcrypto`, `plpgsql`, `supabase_vault`, `uuid-ossp`
- RLS policy: `public.logistics_store`, `service role can manage logistics store`, `ALL`

## Blocker

Phase 3 pre-clean baseline is complete. Wait for explicit user approval before cleanup or Restore Drill.

## Phase 3 Baseline Files

- `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump`
- `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump.sha256`
- `dr-test-backups/20260627_184133/storage_buckets_manifest.tsv`
- `dr-test-backups/20260627_184133/storage_objects_manifest.tsv`
- `dr-test-backups/20260627_184133/storage_manifest.sha256`
- `dr-test-backups/20260627_184133/PRE_CLEAN_REPORT.md`

## Production

Safe: no Production DB operation in this task.
