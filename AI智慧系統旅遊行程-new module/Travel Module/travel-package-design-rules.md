# Travel Package Design Rules

Each independent travel package must follow these fixed rules.

## Fixed Page Pattern
Every package page should use the same structure:

1. Hero image
2. Package name
3. Short premium tagline
4. Key route highlights
5. Recommended vehicle
6. Estimated duration
7. Price range or quote note
8. Inquiry action

## Reference Visual Pattern
Use the provided Jiufen / Shifen day tour reference image as the design direction.

Required visual blocks:
- Full-width destination hero image.
- Top-left popularity badge, such as `人氣 NO.1`.
- Large Chinese package title.
- Smaller English subtitle.
- Short keyword line, such as attractions / scenery / food.
- Primary reservation button.
- LINE consultation button.
- White or light premium content band under the hero.
- Icon highlight row.
- Four destination image cards.
- Itinerary timetable block.
- Vehicle selection block.
- Price plan block.

The layout should feel like a premium travel product page, not a text-heavy article.

## Fixed Vehicle Definition
Each package must define one primary recommended vehicle and optional upgrade choices.

Required vehicle fields:
- Primary vehicle type
- Passenger capacity
- Luggage capacity
- Upgrade option
- Reason for recommendation

Default vehicle mapping:
- 1-3 travelers: five-seat sedan
- 4-6 travelers: nine-seat business van
- 7-8 travelers: nine-seat business van or executive MPV
- 9+ travelers: minibus or coach bus
- Premium itinerary: luxury sedan / executive MPV

## Fixed Image Rules
Each package must have a controlled image set.

Required images:
- Hero image
- Route highlight image
- Vehicle or service image

Image requirements:
- Use real destination or high-quality generated destination-like images.
- Avoid low-resolution, dark, blurry, or unrelated stock images.
- Favor wide landscape images for hero sections.
- Use compressed web-ready images before upload.
- Keep file size small for hosting performance.

Recommended image dimensions:
- Hero: 1600 x 900
- Card thumbnail: 800 x 600
- Mobile safe crop: center-focused 4:5 or 1:1 image

Hosting size targets:
- Hero image: under 500 KB when possible
- Card image: under 250 KB when possible
- Total package image set: under 2 MB when possible
- Do not commit original oversized source images unless the user approves

## Fixed Folder Logic
Each package should live in its own folder when implementation starts.

Folder pattern:

```text
Travel Module/
  packages/
    package-slug/
      package.md
      images.md
      quote-rules.md
```

Rules:
- Do not put all packages into one oversized file.
- Keep text, image notes, and quote rules separated.
- Do not upload large raw images into the repo until approved.

## Fixed Content Style
Use less text and bigger images.

Text rules:
- Package title: short and premium.
- Tagline: one sentence.
- Highlights: 3-5 bullets.
- Avoid long paragraphs.
- Avoid overly promotional text blocks.
- Use short labels similar to:
  - 十分天燈
  - 十分瀑布
  - 九份山城
  - 在地美食
  - 專車接送

Visual rules:
- Large first image.
- Dark premium background.
- Gold accents.
- Spacious layout.
- Clear inquiry button.
- Image cards should carry the experience visually, with only short captions.

## Fixed High-End Style
The style should feel premium and private-tour focused.

Design keywords:
- black and gold
- private itinerary
- executive transport
- quiet luxury
- curated route
- concierge confirmation
- cinematic destination imagery
- refined package cards
- clear premium price plans

Avoid:
- discount-heavy layout
- crowded marketplace layout
- cartoon icons
- cheap coupon style
- long dense text

## Inquiry Behavior
Travel package inquiry must remain separate from airport-transfer orders until approved.

Do not trigger:
- existing booking Excel
- existing airport-transfer LINE dispatch
- existing Gmail booking email
- payment link generation

Future flow:
1. Customer selects package.
2. AI estimates route and vehicle.
3. Customer sends inquiry.
4. Customer service confirms final route and quote.
5. Payment link is generated only after quote confirmation.

## Future Integration Rule
Travel Module remains separate while designing and testing.

After all travel package specs are complete:
1. Review file size and hosting capacity.
2. Run build checks.
3. Connect Travel Module to the homepage menu only after approval.
4. Keep Pegasus booking v1.12 as the rollback stable version.
5. Release the combined system as `1.5.0`.
