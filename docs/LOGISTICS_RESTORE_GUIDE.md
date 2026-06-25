# Sky Logistics Restore Guide

## Purpose

Restore the verified 2026-06-24 Sky Logistics backup from the Backup Project into a recovery environment. Do not run these steps against the live Production project without an approved change window and a verified rollback plan.

## What the backup contains

The backup table is `public.logistics_store`. It holds four JSON store keys:

- `shipments` — 11 shipments; their tracking events and notification logs are embedded in each shipment JSON object.
- `audit_logs` — 39 records.
- `print_jobs` — 2 records.
- `password_reset_requests` — 1 record.

## Preconditions

1. Confirm the destination is a recovery project or an approved maintenance window.
2. Take a fresh snapshot of the destination before replacing any live data.
3. Obtain database credentials through the approved secret-management path; never place them in source control or this document.
4. Confirm that the application expects the same `logistics_store` JSON-key design.

## Restore procedure

1. Create the table if it does not already exist:

```sql
CREATE TABLE IF NOT EXISTS public.logistics_store (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

2. In a transaction, copy the four records from the Backup Project to the approved destination using an upsert by `key`. Preserve each `value` JSON document exactly.

3. Commit only after all four keys have been copied successfully. If any copy or validation fails, roll back the transaction.

4. Validate the restored data before enabling application traffic:

| Metric | Expected |
| --- | ---: |
| Store keys | 4 |
| Shipments | 11 |
| Embedded tracking events | 51 |
| Embedded notification logs | 62 |
| Audit logs | 39 |
| Print jobs | 2 |
| Password-reset requests | 1 |

5. Compare a canonical JSON SHA-256 digest of each of the four `value` documents between the Backup Project and restore destination. All four must match.

## Important notes

- `trackingEvents` and `notificationLogs` are embedded arrays inside `shipments`; they are not standalone tables.
- Do not merge in local/dev seed data such as `carrier_settings` unless an explicit migration requires it; it was not part of this Production backup.
- A restore is a write operation. Keep the production source read-only during backup and use a controlled deployment/change window for any restore.
