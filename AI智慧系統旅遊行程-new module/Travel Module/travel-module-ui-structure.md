# Travel Module UI Structure

## First Screen
The module should open directly to a usable inquiry form.

Do not create a landing page first.

## Visual Style
- Black background.
- Gold primary action buttons.
- Dark navy form panels.
- Yellow borders matching current booking pages.
- Large but compact section headings.
- Rounded form panels consistent with current Pegasus booking style.
- Avoid unrelated illustration-heavy marketing blocks.

## Desktop Layout
Use a two-column operational layout:

1. Left column: travel inquiry form
2. Right column: AI route and quote assistant

## Mobile Layout
Stack sections in this order:

1. Customer contact
2. Travel basics
3. Destination / itinerary preference
4. Vehicle and service options
5. Budget and quote
6. AI recommendation panel

## Header
Use existing Pegasus branding:

- Logo
- Back to home
- LINE immediate consultation
- AI quote assistant status

## Primary Actions
- Save inquiry draft
- AI estimate itinerary
- Request customer service confirmation

Do not add payment action on the first design unless the quote has been confirmed.

## AI Assistant Panel
The right-side assistant should show:

- Suggested route
- Estimated duration
- Recommended vehicle
- Market price range
- Pegasus suggested quote
- Notes requiring customer service confirmation

## Field Controls
- Date picker for travel date.
- Select menus for trip type and destination presets.
- Number inputs or steppers for travelers and luggage.
- Toggle for child seat / booster seat.
- Checkbox group for special needs.
- Text area for custom itinerary notes.

## Status Labels
Use clear statuses:

- Draft inquiry
- AI estimated
- Waiting for customer confirmation
- Waiting for customer service final quote
- Quote confirmed
- Payment link ready

## Data Safety
- This module must not write to the current airport-transfer order Excel file.
- This module must not trigger existing LINE dispatch notification.
- This module must not trigger existing Gmail booking email.
- This module must have its own storage and notification flow when approved.
