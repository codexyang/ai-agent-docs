# SKY Shopping Disaster Recovery Plan

Date: 2026-07-02  
Status: Draft SOP / planning baseline  
Scope: SKY Shopping storefront + SKY Logistics recovery foundation

## Current Project Plan

This section supersedes older DR-Test project assumptions.

### Shopping

| Role | Project Ref | Rule |
| --- | --- | --- |
| Production | `yafykwpivreqexbcilfm` | Official live baseline. Do not modify by AI. |
| Backup | `iynhnfquzvzkvyvaitoh` | Formal backup target/source. Sync only; no development. |
| Development | `rvrdlofcaerzxktqpbjk` | Development and schema verification only. |

### Logistics

| Role | Project Ref | Rule |
| --- | --- | --- |
| Production-like | `kyzwwotjunouzegyfqgz` | Read-only / production-like logistics reference. Not DR-Test. |
| Backup | `vwarhnoewfjugwkrmpkm` | Logistics backup target/source. |

### DR-Test

| Role | Project Ref | Rule |
| --- | --- | --- |
| DR-Test | To be created | Must be a new, blank, isolated project. Do not reuse any project with formal or real data. |

## Non-negotiable Safety Rules

- Do not modify Production.
- Do not push to Production.
- Do not deploy Production.
- Do not run destructive migrations.
- Do not use `kyzwwotjunouzegyfqgz` as DR-Test.
- Do not use Backup as a development database.
- Do not treat DR-Test as Staging.
- Codex should not continue DB Push workflow.

## DR Objectives

1. Shopping: Production → Backup → Restore validation.
2. Logistics: Production-like → Backup → Restore validation.
3. Restore Drill must use a clean, dedicated DR-Test project.
4. Validate one-click or minimal-step recovery before Enterprise V2 / logistics expansion.

## Backup Creation Flow

### Shopping Production → Backup

1. Confirm source is `yafykwpivreqexbcilfm`.
2. Confirm target is `iynhnfquzvzkvyvaitoh`.
3. Create database dump from Production or approved backup source.
4. Generate SHA256 checksum.
5. Export Storage payload and manifest.
6. Pair backup with Prisma schema and migrations.
7. Record backup timestamp, operator, and source ref.
8. Verify backup can be read without touching Production.

Required outputs:

- DB dump
- DB dump SHA256
- Storage payload backup
- Storage manifest
- Storage SHA256
- Prisma schema snapshot
- Migration snapshot
- Backup inventory report

### Logistics Production-like → Backup

1. Confirm source is `kyzwwotjunouzegyfqgz`.
2. Confirm target is `vwarhnoewfjugwkrmpkm`.
3. Perform read-only source export.
4. Write only to logistics Backup target.
5. Generate canonical JSON / table checksums where applicable.
6. Record backup timestamp, operator, and source ref.

Required outputs:

- Logistics DB / logical store backup
- Checksum report
- Backup inventory report

## Restore Flow

### Clean DR-Test Project Creation

1. Create a brand-new Supabase project dedicated to DR-Test.
2. Confirm the project is empty and isolated.
3. Confirm no Vercel / external service points to it.
4. Store its project ref in SAOS only after identity verification.

### Shopping Backup → DR-Test

1. Confirm target is the new clean DR-Test project.
2. Verify backup checksum.
3. Restore schema and data.
4. Restore Storage payload.
5. Apply compatible Prisma schema/migration verification.
6. Run acceptance checklist.

### Logistics Backup → DR-Test

1. Confirm target is the new clean DR-Test project or a dedicated logistics DR-Test schema/project.
2. Verify logistics backup checksum.
3. Restore logistics store/schema.
4. Run logistics mock health checks.

## RTO / RPO Targets

Initial targets until measured by first successful drill:

| System | RTO Target | RPO Target |
| --- | --- | --- |
| Shopping | 60 minutes | 24 hours or latest verified backup |
| Logistics | 60 minutes | 24 hours or latest verified backup |

After first drill:

- Replace targets with measured RTO/RPO.
- Record bottlenecks.
- Update one-click recovery steps.

## Validation Checklist

### Database

- Table list matches expected schema.
- Row counts are within expected restored range.
- RLS policies restored.
- Extensions available.
- Auth user strategy confirmed.

### Storage

- `product-images` bucket exists.
- Object count matches manifest.
- Product image URLs can be resolved in DR environment.

### Application

- Build passes, or human execution result is recorded.
- Admin login works.
- Frontend homepage works.
- Product list works.
- Cart works.
- Checkout test mode works.
- Order / OrderItem creation works in test mode.
- Payment API mock works.
- Logistics Bridge mock works.
- API health check works.

## Human Execution Gate

If the AI environment cannot run any of the following after one attempt, stop and ask the human to run them:

- `npx prisma generate`
- `prisma migrate`
- `npm run build`
- Node.js / Prisma Engine dependent command

Until human result is returned:

- no DB Push
- no Migration
- no Deploy
- no Git Push for code changes
- no Production modification

## Failback Flow

Failback means returning service to the formal Production path after DR validation or incident recovery.

1. Freeze writes to temporary DR environment.
2. Confirm Production root cause is resolved.
3. Confirm latest safe backup / delta plan.
4. Reconcile data deltas if any.
5. Restore or promote only after explicit approval.
6. Validate Production:
   - frontend
   - admin
   - product list
   - cart
   - checkout
   - orders
   - payment
   - logistics
7. Unlock traffic gradually.
8. Record incident / drill report.

## Current Gaps

- Clean blank DR-Test project is not yet created.
- Formal Shopping Production → Backup automatic sync is not yet verified.
- Shopping Backup → DR-Test restore has not yet been proven.
- Logistics Production-like → Backup restore has not yet been proven.
- One-click recovery workflow has not yet been validated.

## Next Actions

1. Create or identify the new blank DR-Test project.
2. Build Shopping Production → Backup sync SOP.
3. Build Logistics Production-like → Backup sync SOP.
4. Produce formal backup files and checksums.
5. Run first Backup → DR-Test restore drill only after formal backup baseline exists.

