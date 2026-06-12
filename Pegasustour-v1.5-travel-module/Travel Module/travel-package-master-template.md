# Travel Package Master Template

## Purpose
This is the reusable master format for all travel itinerary package pages.

Staff maintain package data in `/travel-admin`.
The public page reads from `/api/travel-packages` and `data/travel-packages.json`.

The module remains independent from airport transfer booking, payment, LINE dispatch, Gmail, and Excel order flows.

## Reference Sources
Use format patterns from:

- Klook / KKday / Viator: package options, itinerary, pickup, included / excluded, cancellation policy.
- Lion Travel / Lifetour / Cola Tour: itinerary highlights, daily schedule, fee includes / excludes, notes, customer-service confirmation.

Do not copy third-party wording or layouts directly. Use the structure only.

## Frontend Master Sections

### 1. Header
- Pegasus logo.
- Home link.
- Staff maintenance link.
- LINE consultation button.
- WhatsApp consultation button for international travelers.

### 2. First Screen
- Large hero image.
- Package badge.
- Chinese package title.
- English subtitle.
- 3-5 highlight tags.
- Right-side inquiry panel.
- Date, traveler count, pickup location, notes.
- AI estimate button.
- Customer service confirmation button.

### 3. Package Options
- Show all active packages.
- Each card shows badge, title, subtitle, option tags, and reference price.
- No direct payment button.

### 4. Itinerary
- Timeline format.
- Recommended row format:
  `time | title | short detail`
- Keep details short enough for mobile.

### 5. Vehicle Plans
- Vehicle name.
- Passenger capacity.
- Reference price.
- Recommendation note.

### 6. Fee And Policy
- Included.
- Excluded.
- Duration.
- Pickup.
- Cancellation / change note.
- Travel notice.

## Admin Maintenance Fields

Required:
- Package name.
- English subtitle.
- Badge / tag.
- Highlight tags.
- Price reference.
- Hero image path.
- Duration.
- Pickup information.

Platform-style fields:
- Package options.
- Itinerary.
- Included.
- Excluded.
- Vehicle options.
- Confirmation note.
- Cancellation note.
- Travel notice.

## AI-Assisted Update Flow

The backend includes a draft endpoint:

```text
POST /api/travel-packages/ai-suggest
```

Current behavior:
- Accepts the staff form draft.
- Detects route keywords such as Jiufen / Shifen, North Coast / Yehliu / Tamsui, or Yilan / hot spring.
- Fills missing master-template fields.
- Returns a draft package.
- Does not write directly to JSON.

Staff workflow:
1. Enter a package name or partial package data.
2. Click `AI 補齊母板草稿`.
3. Review the generated fields.
4. Click `確認並儲存行程資料`.

Future behavior can connect this endpoint to OpenAI or another model, but it must keep the human-confirm-before-save rule.

## Text Length Rules

- Title: 8-16 Chinese characters when possible.
- Subtitle: short English product name.
- Highlight tags: 2-6 characters each.
- Itinerary detail: one short sentence.
- Included / excluded: short nouns, not paragraphs.
- Notice: one to two sentences.

## Image Slots

Current master supports:
- Hero image: `image`

Future image slots:
- Route highlight image.
- Vehicle / service image.
- Gallery thumbnails.

Recommended sizes:
- Hero: 1600 x 900, under 500 KB when possible.
- Card image: 800 x 600, under 250 KB when possible.

Hard limit:
- No uploaded travel image may exceed 2 MB.
- Images over 2 MB must be resized / compressed before adding to the project.

## Thumbnail Strategy For 100 Packages

Do not create or upload images for all 100 packages at once.

Use this phased strategy:
1. Keep the 100 package database text-first.
2. Use one shared placeholder image path while the package is not yet visually finalized.
3. When a package is selected for launch, create only the needed small images.
4. Compress before adding to `public/images/travel/`.
5. Update the package `image` field in `/travel-admin`.

Suggested image slots per launched package:
- `card`: 800 x 600, target under 250 KB.
- `hero`: 1600 x 900, target under 500 KB.
- Optional `gallery`: 3-5 images, each under 250 KB.

Naming rule:

```text
public/images/travel/{package-id}-card.jpg
public/images/travel/{package-id}-hero.jpg
public/images/travel/{package-id}-gallery-01.jpg
```

This prevents the Travel Module from becoming too large before integration with the booking system.

Image audit command:

```bash
npm run audit:travel-images
```

The audit fails when any travel image exceeds 2 MB.

Reference image calculation on 2026-06-01:

| File | Dimensions | Size | Status |
| --- | ---: | ---: | --- |
| 0f3bedcc-249a-430f-85a3-0201e5bee272.png | 1536 x 1024 | 2.36 MB | Too large |
| 4b019d05-39e3-4dd6-8918-b52440a40880.png | 1054 x 1492 | 2.36 MB | Too large |
| 6a7e0123-18e2-44e2-8af0-c598ce45ede7.png | 1024 x 1536 | 2.49 MB | Too large |
| 74c188dc-a831-4ceb-8d82-62d27261e263.png | 1024 x 1536 | 2.15 MB | Too large |

These reference files should be treated as design references only. Do not upload them as production assets without compression.

## Style Direction

The template is not limited to black / gold.

Allowed style families:
- Black gold premium.
- Bright luxury travel.
- Coastal fresh.
- Seasonal campaign color.

The page should attract attention first, then remain clear enough for staff-assisted inquiry.

## Safety Rules

Do not trigger:
- Airport transfer order creation.
- Payment link creation.
- LINE dispatch notification.
- Gmail order email.
- Excel booking export.

Future integration into Pegasus booking v1.12 requires user approval and should be released as v1.5.0.

## International Traveler Contact

WhatsApp is required for overseas guests.

Current shared setting:

```text
app/data/contactChannels.ts
```

Update `whatsappUrl` there when the official WhatsApp number is confirmed.
Use one centralized URL instead of hardcoding links in multiple components.
