# PRODUCTION MODE

Production is protected.

Before any deploy:

- Backup confirmed.
- Rollback tag confirmed.
- Dev validation PASS.
- Staging validation PASS.
- Approval recorded.

Forbidden:

- Production DB writes by AI.
- Production migration without explicit migration plan.
- Secret changes without approval.

