# SKY Shopping Formal Backup Baseline Inventory

Date: 2026-07-02  
Scope: SKY Shopping formal Backup Baseline for future `Backup → DR-Test` Restore Drill  
Mode: Inventory only — no Restore Drill started

## Status

FAIL — formal SKY Shopping Production Backup Baseline is not complete.

The workspace currently contains a DR-Test pre-clean baseline dump, but no verified formal SKY Shopping Production / Backup database dump. The DR-Test dump must not be treated as a formal Production Backup.

## Safety

| Rule | Status |
| --- | --- |
| Production modified | PASS — no |
| Production DB write | PASS — no |
| Restore Drill started | PASS — no |
| Fake backup created | PASS — no |
| Prisma / build commands run | PASS — no |

## Backup Inventory

| Resource Type | Available | Evidence | Created Time | Storage Included | Migration Included | Schema Included | Restore Usable |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SKY Shopping formal Production DB dump | NO | No formal Production / Backup dump found in workspace | N/A | N/A | N/A | N/A | NO |
| Supabase native backup | UNKNOWN | Requires Supabase Dashboard / API confirmation for Backup project | N/A | Unknown | Unknown | Unknown | UNKNOWN |
| Storage backup | NO | Only DR-Test storage metadata manifest found; no formal Storage object backup found | N/A | Metadata only | N/A | N/A | NO |
| Migration files | PARTIAL | `.preview-worktrees/sky-shopping-header/prisma/migrations/*` | 2026-06-07 migration dirs | N/A | YES, local Prisma migration history | Partial schema evolution only | PARTIAL |
| Prisma schema | YES | `.preview-worktrees/sky-shopping-header/prisma/schema.prisma` | Current local file | N/A | N/A | YES | YES for schema reference |
| DR-Test pre-clean DB dump | YES, but not formal Backup | `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump` | 2026-06-27 18:43:58 CST | No Storage file payload | Dump contains DB schema/data at DR-Test time | Yes, from DR-Test | YES only for DR-Test self-restore |
| DR-Test storage manifest | YES, metadata only | `storage_buckets_manifest.tsv`, `storage_objects_manifest.tsv` | 2026-06-27 20:24 CST | Metadata only, 8 object rows | N/A | N/A | NO for Storage payload restore |
| Logistics logical backup | YES, logistics only | `docs/LOGISTICS_BACKUP_REPORT_2026-06-24.md` | 2026-06-24 | Not SKY Shopping storefront storage | N/A | Logical KV table schema only | YES for logistics KV scope only |

## Existing DR-Test Baseline Artifacts

These are useful for rollback of the DR-Test environment itself, but they are not formal Production Backup:

| File | Time | Size / Hash |
| --- | --- | --- |
| `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump` | 2026-06-27 18:43:58 CST | 260049 bytes |
| `dr-test-backups/20260627_184133/kyzwwotjunouzegyfqgz_preclean.dump.sha256` | 2026-06-27 18:43:58 CST | SHA256 recorded |
| `dr-test-backups/20260627_184133/storage_buckets_manifest.tsv` | 2026-06-27 20:24:19 CST | bucket metadata |
| `dr-test-backups/20260627_184133/storage_objects_manifest.tsv` | 2026-06-27 20:24:17 CST | 8 object metadata rows |

DR-Test dump SHA256:

```text
c55689006e6abcd6d04932b91be7172928dd1d2ce7d6258575991bd901c748b5
```

## Local Migration / Schema Inventory

Prisma schema:

```text
.preview-worktrees/sky-shopping-header/prisma/schema.prisma
```

Prisma migrations found:

```text
.preview-worktrees/sky-shopping-header/prisma/migrations/20260607045628_init
.preview-worktrees/sky-shopping-header/prisma/migrations/20260607051412_add_site_stats
.preview-worktrees/sky-shopping-header/prisma/migrations/20260607081505_add_admin_log
.preview-worktrees/sky-shopping-header/prisma/migrations/20260607082106_add_admin_table
.preview-worktrees/sky-shopping-header/prisma/migrations/20260607103403_make_address_optional
```

Important limitation: these migrations do not fully represent all currently observed DR-Test public tables such as `Category`, `Supplier`, `Shipment`, `TrackingEvent`, `NotificationLog`, and `logistics_store`. Therefore migration history is partial and cannot alone serve as a complete restore baseline.

## Missing Required Items

To establish a formal SKY Shopping Backup Baseline, the following are still required:

1. Formal SKY Shopping Production or Backup DB dump.
2. Dump source environment and project ref.
3. Backup timestamp.
4. SHA256 checksum for the formal dump.
5. Confirmation whether dump includes schema, data, auth schema, storage metadata, extensions, and RLS policies.
6. Storage backup payload for `product-images` or a documented object-level export.
7. Storage manifest checksum.
8. Migration / Prisma schema version paired with the backup.
9. Restore instructions for the exact dump format.

## Restore Drill Required File List

Before starting the first real `Backup → DR-Test` Restore Drill, provide or create these formal files:

| Required File | Purpose | Status |
| --- | --- | --- |
| `sky-shopping-production-YYYYMMDD_HHMMSS.dump` or equivalent | Formal DB restore source | MISSING |
| `sky-shopping-production-YYYYMMDD_HHMMSS.dump.sha256` | Dump integrity check | MISSING |
| `storage-product-images-YYYYMMDD_HHMMSS.tar` or object export folder | Storage restore source | MISSING |
| `storage-product-images-YYYYMMDD_HHMMSS.manifest.tsv` | Storage object list | MISSING |
| `storage-product-images-YYYYMMDD_HHMMSS.sha256` | Storage integrity check | MISSING |
| `prisma/schema.prisma` matching backup | ORM schema reference | AVAILABLE locally, not yet paired to formal backup |
| `prisma/migrations/*` matching backup | Migration history | PARTIAL locally, not yet paired to formal backup |
| `RESTORE_CHECKLIST.md` | Acceptance checklist | AVAILABLE |
| `DR_TEST_REPORT.md` | Phase 1 verification | AVAILABLE |

## Conclusion

Formal Backup Baseline is not yet established. Do not start the first real Restore Drill until a verified formal Backup DB dump and Storage backup are available.

