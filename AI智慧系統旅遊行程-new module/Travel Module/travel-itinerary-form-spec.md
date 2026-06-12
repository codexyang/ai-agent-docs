# Travel Itinerary Form Spec

## Purpose
Collect travel itinerary inquiries independently from the current airport-transfer order system.

The form should support:
- private day tours
- multi-day tours
- chartered sightseeing
- customized itineraries
- airport transfer plus travel itinerary packages
- corporate or group travel inquiry

## Required Fields
These fields must be completed before creating a travel inquiry.

1. Customer name
2. Phone / LINE / WhatsApp contact
3. Travel date
4. Number of travelers
5. Departure city / pickup location
6. Destination or preferred travel area
7. Trip type
8. Preferred vehicle type

## Optional Fields
These fields should improve quotation accuracy but must not block draft inquiry creation.

1. Email
2. Hotel name
3. Flight number
4. Flight arrival / departure time
5. Budget range
6. Preferred language
7. Child seat / booster seat
8. Luggage quantity
9. Meal preference
10. Accessibility needs
11. Special requests

## Trip Type Options
- Half-day tour
- One-day tour
- Multi-day tour
- Airport transfer + sightseeing
- Corporate travel
- Family private tour
- Custom itinerary

## Vehicle Options
- Five-seat sedan
- Nine-seat business van
- Luxury sedan
- Executive MPV
- Minibus
- Coach bus
- Not sure, recommend by AI

## Destination Presets
Taiwan common travel areas:

- Taipei / New Taipei
- Taoyuan
- Hsinchu
- Miaoli
- Taichung
- Changhua
- Nantou
- Yunlin
- Chiayi
- Tainan
- Kaohsiung
- Pingtung
- Yilan
- Hualien
- Taitung
- Sun Moon Lake
- Alishan
- Qingjing Farm
- Taroko
- Jiufen / Shifen / Pingxi
- Yehliu / North Coast
- Kenting

## Suggested Form Sections

### 1. Customer Contact
- Name
- Phone
- LINE ID
- WhatsApp number or ID for international travelers
- Email

### 2. Travel Basics
- Travel date
- Trip duration
- Number of travelers
- Number of luggage items
- Departure city / pickup location
- Destination / travel area

### 3. Itinerary Preference
- Trip type
- Preferred attractions
- Must-visit places
- Flexible route yes/no
- Need tour guide yes/no
- Preferred language

### 4. Vehicle And Service
- Vehicle type
- Child seat / booster seat
- Wheelchair or accessibility support
- Large luggage
- Multiple pickup/drop-off points

### 5. Budget And Quote
- Budget range
- Need market price estimate yes/no
- Need premium vehicle quote yes/no
- Need AI recommendation yes/no

### 6. Notes
- Free text special requests
- Internal customer service note

## Quote Rules
- AI must provide a first estimated price range when enough route/date/person count information is available.
- AI should recommend a vehicle type based on traveler count, luggage, and trip style.
- For complex, multi-day, or special itineraries, AI may provide a range and state that final price will be confirmed by customer service.
- Do not send a general travel inquiry to payment until itinerary and quotation are confirmed.

## Future Submission Flow
Draft only. Do not implement until approved.

1. Customer fills travel itinerary form.
2. AI provides initial route suggestion and price range.
3. Customer confirms preferred itinerary.
4. System creates travel inquiry.
5. Customer service reviews and confirms final quote.
6. Optional payment link is created after quote confirmation.
