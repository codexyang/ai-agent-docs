# AI智慧系統旅遊行程-new module 交接摘要

## Purpose
This folder contains only the travel itinerary module work.
It must not include the previous airport-transfer booking system.

## Current Source Project
- Project: Pegasus booking Next.js
- Stable version protected: `1.12.0`
- Travel Module status: independent module in progress
- Future target version after full integration approval: `1.5.0`

## Included Travel Module Parts
- Travel frontend route: `app/travel/page.tsx`
- Travel maintenance backend: `app/travel-admin/page.tsx`
- Travel package API: `app/api/travel-packages/route.ts`
- Travel package JSON store: `app/api/travel-packages/travelPackageStore.ts`
- Travel default data type: `app/data/travelPackageDefaults.ts`
- Travel package data: `data/travel-packages.json`
- Travel image assets: `public/images/travel/`
- Planning documents: `Travel Module/`

## Excluded Stable Booking System
Do not transfer or modify these booking-system parts in the new module:
- `app/booking/`
- `app/airport-pickup/`
- `app/payment/`
- `app/api/booking/`
- `app/api/payment/`
- LINE dispatch notification flow
- Gmail order email flow
- Excel booking order export flow

## Current Travel Pages
- Public travel page: `/travel`
- Travel admin page: `/travel-admin`
- Travel packages API: `/api/travel-packages`

## Current Packages
1. 九份十分包車一日遊
   - Tag: 人氣 NO.1
   - Price reference: NT$5,800 起
   - Image: `public/images/travel/jiufen-shifen-reference.jpg`
2. 北海岸野柳淡水夕陽一日遊
   - Tag: 人氣 NO.2 行程
   - Price reference: NT$5,800 起
   - Image: `public/images/travel/north-coast-yehliu-tamsui-reference.jpg`
3. 宜蘭溫泉慢旅
   - Tag: 慢旅推薦
   - Price reference: 專人報價

## Hosting Notes
- Keep files small.
- Keep package specs separated by folder.
- Avoid raw oversized images.
- Use compressed web-ready images.
- Confirm production hosting supports runtime JSON writes before using the current local JSON admin flow online.
- If hosting is serverless or read-only, move package data to Google Sheets, Supabase, or another database.

## Next Steps
1. Continue designing the remaining travel packages.
2. Keep the travel module separate from booking/payment/order notification flows.
3. Test `/travel-admin` add/update flow.
4. Decide production data storage before domain upload.
5. Only after approval, integrate with Pegasus booking v1.12 and release as `1.5.0`.
