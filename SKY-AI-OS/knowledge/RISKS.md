# Risks

Version: SAOS v2.0

## High Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Wrong Supabase project used | Data loss or downtime | Confirm Project Ref before action. |
| Production DB write | Live business impact | Production is read-protected and write-forbidden for Agents. |
| Secrets committed | Security incident | Never write passwords/API secrets to docs or commits. |
| DR-Test cleaned too early | Loss of restore baseline | Require backup, manifest, and approval first. |
| Full repo scan by Agents | Token waste and confusion | Read SAOS first, then targeted inspection. |

## Current Risk

DR-Test direct connection has not yet produced a successful `psql` identity check. Do not proceed to cleanup until connection and backup are successful.

