# 15-minute defence preparation

## 5-minute live demo — three strongest queries
1. Revenue per vendor: explain `$group`, `$sum`, `$lookup`, `$sort`.
2. Peak hour per day: explain `$dayOfMonth`, `$hour`, sorting and `$first`.
3. Sesame recall: explain `updateMany`, `$[dish]`, and `arrayFilters`.

## 5-minute twist
At 19:00, update all menu array elements containing `sesame` to `available:false`. Then query vendors that have at least one remaining available dish with no sesame in the recorded allergen list. State the limitation: MongoDB data cannot guarantee no cross-contact in the physical kitchen.

## Individual questions and model answers
**Q: Why embed menus?** Small, bounded data is read with its parent vendor; embedding avoids a lookup.

**Q: Why reference orders?** Orders are unbounded and independently queried. Embedding them would grow vendor documents indefinitely.

**Q: Does deleting a vendor delete its orders?** No. MongoDB references are application-managed; there is no automatic cascade delete.

**Q: What does `$unwind` do?** It outputs one pipeline document per element of an array, enabling dish-level analysis.

**Q: Why `$lookup` in best-selling dish analysis?** Orders store only `vendor_id`; lookup adds the vendor's cuisine to each order line.

**Q: What does `$first` mean?** It retains the first value in each group. We sort by units sold descending first so the first dish is the best seller.

**Q: What does `totalDocsExamined` mean?** The number of documents examined by the query plan. Compare actual explain output before and after the index.

**Q: Why might the index not help?** The peak-hour pipeline groups all orders without a selective time filter, so it may need to inspect every order.

**Q: What does JSON Schema validation do?** It rejects writes that do not match required field types and constraints, such as missing cuisine or a negative menu price.

**Q: Can the sesame query guarantee allergy safety?** No. It only uses recorded allergen metadata and cannot detect cross-contamination.
