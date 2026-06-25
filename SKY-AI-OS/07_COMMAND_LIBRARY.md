# Command Library

Version: SAOS v2.0

This file records safe command patterns. Never paste secrets into committed commands.

## Git Safety

```bash
git status --short
git branch --show-current
git diff --stat
git diff -- docs/
```

## Documentation-Only Commit Check

Confirm changed files are limited to:

- `SKY-AI-OS/**/*.md`
- `docs/**/*.md`
- `README.md`
- `CURRENT_STATUS.md`
- `SKILL-*.md`

Confirm changed files do not include:

- `.env`
- `package.json`
- `package-lock.json`
- `supabase/config.toml`
- `supabase/migrations/*`
- `schema.sql`
- Production settings

## Read-Only DB Identity Check

Use only with the correct environment connection string and redacted password handling.

```bash
psql "$DATABASE_URL" -c "select current_database(), current_user;"
```

## Forbidden Commands Without Explicit Approval

- `prisma migrate deploy`
- `prisma migrate reset`
- `prisma db push`
- `DROP TABLE`
- `DROP COLUMN`
- `TRUNCATE`
- broad `DELETE`
- changing Vercel production environment variables

