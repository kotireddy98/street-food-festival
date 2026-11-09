# Street Food Festival — Written Report

**Maximum length:** 6 pages. Replace bracketed prompts with your own Atlas screenshots and measured results.

## 1. Objective and environment
The project models a three-day street food festival (20–22 June 2026) in MongoDB Atlas. It stores 12 vendors and their menus, then analyses 300 synthetic sales orders. Environment: MongoDB Atlas free cluster, database `festival`, collections `vendors` and `orders`.

## 2. Data model and design decisions
`vendors` stores vendor identity, cuisine, stall, rating, tags, and an embedded `menu` array. `orders` stores each transaction separately and references its vendor with `vendor_id`.

**Why embed the menu?** The menu is small, bounded, and normally retrieved with its vendor. Embedding avoids an extra lookup for common vendor/menu reads and keeps menu data together. **Why reference orders?** Order history is unbounded and grows over time; a separate collection avoids unbounded vendor documents and supports independent sales analysis.

See `model-diagram.mmd`.

## 3. CRUD and validation
- Vegan dishes under EUR 7: unwind the embedded menu and match `vegan=true`, `price < 7`.
- Zone B vendors rated above 4.3: filter nested stall zone and rating.
- Georgian price update: use updateMany with an aggregation update pipeline and `$map` to change each embedded menu price by 10%.
- Vendor deletion: MongoDB does not enforce foreign keys or cascade deletion. Orders remain with the deleted `vendor_id`; this creates orphan references unless application logic explicitly deletes or archives them.
- JSON Schema: cuisine is required; each menu price has minimum 0. A negative-price insert is rejected with document validation failure.

## 4. Business analysis — five pipelines
1. **Revenue per vendor:** group orders by `vendor_id`, sum `total`, sort descending; lookup vendor names for readable output.
2. **Busiest hour per day:** extract day and hour from `ts`, count orders per day/hour, sort by count, then take the top hour for each day. Timestamps are UTC.
3. **Best-selling dish per cuisine:** unwind order items, lookup vendor cuisine, group by cuisine/dish and sum quantities, sort, then retain the top dish per cuisine.
4. **Payment share:** count orders by payment method, calculate each method's percentage of all orders.
5. **Festival report:** aggregate total orders, revenue and average order value, then write the summary to `festival_report` using `$out`.

Insert your actual result screenshots and briefly state which vendor, hour, dish, and payment method ranked highest. Values vary because orders are random.

## 5. Index and explain
Create compound index `{ ts: 1, vendor_id: 1 }` on orders. Run the same `db.orders.explain("executionStats").aggregate(...)` before and after. Record `executionStats.totalDocsExamined` from both outputs. The supplied all-record grouping may still scan all 300 documents because it has no selective `$match` on `ts`; do not claim an improvement if explain does not show one. Discuss why index usefulness depends on query predicates and pipeline shape.

| Measurement | Before index | After index |
|---|---:|---:|
| totalDocsExamined | [your result] | [your result] |
| executionTimeMillis | [your result] | [your result] |

## 6. Sesame recall and conclusion
At 19:00, one `updateMany` with `arrayFilters` marks every menu item whose allergens include sesame as `available:false`. The final query lists stalls with at least one available dish whose recorded allergens do not include sesame. This is a data-based shortlist only: it cannot account for cross-contamination, shared fryers, utensils, or inaccurate ingredient declarations; visitors must confirm with stall staff.

## Screenshots checklist
1. Atlas cluster and `festival` database/collections.
2. 12 inserted vendor documents.
3. 300 order count and sample order.
4. Vegan dish query and zone B query.
5. Georgian price update before/after.
6. Vendor deletion and remaining orphan order count.
7. Each of the five aggregation pipelines with output.
8. Explain executionStats before and after index.
9. Rejected negative-price insert error.
10. Sesame update result and safe-listed stalls.
11. Exported JSON files in your project folder.
