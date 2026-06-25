# TODO

Version: SAOS v2.0

## Immediate

- Confirm DR-Test database connection.
- Create DR-Test pre-clean dump.
- Generate SHA256 checksum.
- Generate Storage manifest.
- Write pre-clean report.

## Before DR-Test Cleanup

- Confirm no Vercel environment uses the old DR-Test project for active staging/production.
- Confirm Auth, RLS, policies, extensions, storage, and functions.
- Get explicit user approval.

## After Approval

- Rename project to SKY Shopping DR-Test if approved.
- Clear only approved test data.
- Run Restore Drill.
- Record PASS / FAIL report.

