# Five-slide defence presentation

## Slide 1 — Street Food Festival Database
- Three-day festival: 20–22 June 2026
- MongoDB Atlas free cluster
- 12 vendors, 5+ cuisines, 300 synthetic orders
- Goal: understand revenue, peak queues, payment mix, allergen recall

## Slide 2 — Data model
- `vendors`: vendor details + embedded menu
- `orders`: independent transaction documents + `vendor_id` reference
- Embed bounded menu data; reference unbounded order history
- Show model diagram

## Slide 3 — Business analytics
- Revenue by vendor
- Busiest hour per festival day
- Best-selling dish per cuisine
- Card/cash/app percentage
- Festival summary written to `festival_report`
- Add your actual pipeline result screenshots

## Slide 4 — Performance and data quality
- Compound index: `{ ts: 1, vendor_id: 1 }`
- Before/after `totalDocsExamined`: [actual values]
- JSON Schema requires cuisine and rejects negative menu prices
- Explain index limitations honestly

## Slide 5 — Sesame recall and lessons
- One `updateMany` with `arrayFilters`
- Mark sesame dishes unavailable
- List stalls with remaining recorded sesame-free available dishes
- Limitation: database cannot prove absence of cross-contact
- Key lesson: model for access patterns, growth, and business questions
