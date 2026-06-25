# Database Topology

```mermaid
flowchart TD
  Production["Production\nLive\nAI modify: NO"] --> Backup["Backup\nProtected backup\nAI modify: NO"]
  Backup --> DRTest["DR-Test\nRestore Drill\nAI: SOP only"]
  Development["Development\nAI work area"] --> Staging["Staging\nIntegration validation"]
  Staging --> Production
```

