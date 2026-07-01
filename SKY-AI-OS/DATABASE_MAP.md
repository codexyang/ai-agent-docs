# DR-Test Database Map

Date: 2026-07-01  
Project Ref: `kyzwwotjunouzegyfqgz`  
Environment: DR-Test / Restore Drill

## Identity

| Item | Value |
| --- | --- |
| Project Ref | `kyzwwotjunouzegyfqgz` |
| Supabase URL | `https://kyzwwotjunouzegyfqgz.supabase.co` |
| DB | `postgres` |
| DB Role Verified | `postgres` |
| PostgreSQL Version | 17.6 |
| Connection Verified | Transaction Pooler, port `6543` |

## Schemas

- `auth`
- `extensions`
- `graphql`
- `graphql_public`
- `information_schema`
- `pg_catalog`
- `pg_toast`
- `pgbouncer`
- `public`
- `realtime`
- `storage`
- `vault`

## Public Application Tables

| Table | Purpose / Notes |
| --- | --- |
| `Admin` | Admin account table |
| `AdminLog` | Admin activity log |
| `Category` | Product category |
| `NotificationLog` | Notification log |
| `Order` | Order |
| `OrderItem` | Order item |
| `Product` | Product |
| `Shipment` | Logistics shipment |
| `SiteStats` | Site statistics |
| `Supplier` | Supplier |
| `TrackingEvent` | Logistics tracking event |
| `logistics_store` | Logistics key-value / store table |

## Storage

| Bucket | Public | Object Count |
| --- | --- | ---: |
| `product-images` | true | 8 |

## Auth

| Item | Count |
| --- | ---: |
| `auth.users` | 0 |

## RLS / Policies

| Schema | Table | Policy | Command |
| --- | --- | --- | --- |
| `public` | `logistics_store` | `service role can manage logistics store` | `ALL` |

## Extensions

- `pg_stat_statements`
- `pgcrypto`
- `plpgsql`
- `supabase_vault`
- `uuid-ossp`

## Views

- `extensions.pg_stat_statements`
- `extensions.pg_stat_statements_info`
- `vault.decrypted_secrets`

## Cron / Webhook

- `pg_cron`: not installed
- `pg_net`: not installed
- `http`: not installed
- `cron` schema: not found
- `net` schema: not found
- webhook/http/cron/notify-like routines in `public`, `storage`, `auth`: not found

## Edge Functions

Status: WARNING  
Reason: Supabase CLI requires access token for current proof. Prior dashboard observation showed no deployed functions, but this report does not claim full CLI proof.

