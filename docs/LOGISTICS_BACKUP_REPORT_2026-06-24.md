# Sky Logistics Backup Report — 2026-06-24

## Result

**PASS** — the active Logistics Production store was copied to the dedicated Backup Project and verified without modifying Production.

## Scope

- Source: active Sky Logistics Supabase store (read-only `GET` through the REST API)
- Destination: `Sky Logistics Backup Project` (`vwarmnoewfjugwkrmpkm`)
- Destination table: `public.logistics_store`
- Copied keys: `shipments`, `audit_logs`, `print_jobs`, `password_reset_requests`

The source uses a key/value JSON design: each store key is a single row and its related records live inside the JSON value. This was therefore a logical store backup, not a `pg_dump` of unrelated database objects.

## Backup-table schema

```sql
CREATE TABLE public.logistics_store (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

## Production vs Backup verification

| Check | Production | Backup | Result |
| --- | ---: | ---: | --- |
| Store keys | 4 | 4 | PASS |
| Shipments | 11 | 11 | PASS |
| Embedded tracking events | 51 | 51 | PASS |
| Embedded notification logs | 62 | 62 | PASS |
| Audit logs | 39 | 39 | PASS |
| Print jobs | 2 | 2 | PASS |
| Password-reset requests | 1 | 1 | PASS |
| Per-key canonical JSON SHA-256 comparison | 4 / 4 identical | 4 / 4 identical | PASS |

## Safety record

- Production was accessed only by HTTP `GET`.
- No Production database or REST write request was sent.
- Destination writes used one PostgreSQL transaction and key-based upserts.
- No password, API key, or connection secret is stored in this report.

