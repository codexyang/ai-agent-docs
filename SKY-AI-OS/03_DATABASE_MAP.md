# Database Map — Five-Environment Topology

Version: SAOS v2.0  
Last updated: 2026-06-25

## Fixed Environment Definitions

| Environment | Purpose | AI Modify | Deploy | Clear Data |
| --- | --- | --- | --- | --- |
| Production | Live business operation | No | Yes, after approval | No |
| Backup | Production backup / restore source | No | No | No |
| Staging | Integration and pre-production validation | Yes, scoped | Test only | Case-by-case |
| Development | AI / developer work area | Yes | No | Allowed if approved |
| DR-Test | Restore Drill / disaster recovery validation | Restore Drill only | No | Only by SOP |

## Known Supabase Project References

| Environment | Known Project Ref | Status | Notes |
| --- | --- | --- | --- |
| Production | Not recorded in SAOS; confirm from approved dashboard before deploy | Protected | User identified `codexyang's Project` as SKY Shopping Production. Do not modify. |
| Backup | `iynhnfquzvzkvywaitoh` / previously referenced backup candidate | Protected | Confirm spelling/ref before any access. Backup is not development. |
| Staging | `udfijsgvwihushsylglb` | Active staging | Current staging project created in new data center. |
| Development | `rvrdlofcaerzxktqpbjk` | Active development | Dev DB for tests and development. |
| DR-Test | `kyzwwotjunouzegyfqgz` | Restore Drill target | Old staging candidate repurposed for DR-Test after approval. |

## DR-Test Direct Connection Identity

Project Ref: `kyzwwotjunouzegyfqgz`  
Direct host: `db.kyzwwotjunouzegyfqgz.supabase.co`  
Database: `postgres`  
User: `postgres`  
Password: never write into documentation.

## Known DR-Test Inventory Snapshot

Read-only inventory observed before Phase 3:

- Auth Users: 0
- Edge Functions: no deployed functions visible
- Storage bucket: `product-images`, public, 8 files
- Extensions: `pg_stat_statements`, `pgcrypto`, `plpgsql`, `supabase_vault`, `uuid-ossp`
- Public tables observed:
  - `Admin`
  - `AdminLog`
  - `Category`
  - `NotificationLog`
  - `Order`
  - `OrderItem`
  - `Product`
  - `Shipment`
  - `SiteStats`
  - `Supplier`
  - `TrackingEvent`
  - `logistics_store`

## Rule

Project count visible in the current Supabase organization must never be used to infer the whole architecture. Production, Backup, Staging, Development, and DR-Test may live in different Supabase accounts or organizations.

