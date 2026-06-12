# Travel Module

Independent travel itinerary module for Pegasus booking.

This module is intentionally separated from the existing airport-transfer order system.
Do not connect it to booking, payment, Email, LINE, or Excel flows until the user explicitly approves implementation.

## Version Protection
- Current stable system version: `1.12.0`.
- Pegasus booking 1.0 / v1.12 must remain stable.
- This folder is a new module workspace only.
- Travel Module must stay independent until all package specs and UI checks are complete.
- After completion and explicit approval, integrate Travel Module with v1.12 and release as `1.5.0`.
- Do not rename or upgrade the main package version before the integration is tested.

## Hosting Size Control
- Keep each travel package split into small files.
- Avoid large raw images in the repository.
- Use compressed web-ready images before domain upload.
- Target hero images under 500 KB when possible.
- Target card images under 250 KB when possible.
- Prefer lazy-loaded image assets for package galleries.
- Check build size before uploading to the production domain.

## Design Direction
- Keep the existing Pegasus black / gold premium style.
- Use compact operational form sections, not a marketing landing page.
- Make the first screen a usable travel itinerary inquiry/order form.
- Keep files small and split by responsibility.

## Platform References
- Klook / KKday style:
  - activity cards
  - instant confirmation badges
  - cancellation notes
  - date / participant selection
  - itinerary highlights
- Viator style:
  - activity details
  - pickup logistics
  - traveler information
  - inclusions / exclusions
  - cancellation policy
- GetYourGuide style:
  - multi-language / multi-currency readiness
  - clear checkout steps
  - availability-centered booking flow
  - trust indicators such as reviews, free cancellation, and likely-to-sell-out labels

## Initial Files
- `travel-itinerary-form-spec.md`: form content and field groups.
- `travel-module-ui-structure.md`: UI layout and interaction notes.
