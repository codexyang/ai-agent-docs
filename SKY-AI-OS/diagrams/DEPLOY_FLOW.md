# Deploy Flow

```mermaid
flowchart TD
  Dev["Development"] --> Preview["Preview Build"]
  Preview --> Staging["Staging Validation"]
  Staging --> Approval["Production Approval"]
  Approval --> ProdDeploy["Production Deploy"]
  ProdDeploy --> Verify["Post-Deploy Verification"]
  Verify --> Lock["Version Lock / Backup"]
```

