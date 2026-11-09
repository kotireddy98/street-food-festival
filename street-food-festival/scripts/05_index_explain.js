// Pipeline used for index comparison: busiest hour of each day.
// Run BEFORE creating the index and save the explain output/screenshot.
const peakHourPipeline = [
  { $group: {
    _id: { day: { $dayOfMonth: "$ts" }, hour: { $hour: "$ts" } },
    orders: { $sum: 1 }
  } },
  { $sort: { "_id.day": 1, orders: -1, "_id.hour": 1 } },
  { $group: { _id: "$_id.day", busiestHour: { $first: "$_id.hour" }, orderCount: { $first: "$orders" } } }
];

db.orders.explain("executionStats").aggregate(peakHourPipeline);

// Create one compound index. `ts` is the leading key, supporting date/time
// filtering and timestamp scans; vendor_id is the second key for vendor-scoped
// time analysis. The supplied unfiltered grouping may still examine all orders.
db.orders.createIndex({ ts: 1, vendor_id: 1 }, { name: "ts_vendor_compound" });

// Run the identical explain AFTER index creation.
db.orders.explain("executionStats").aggregate(peakHourPipeline);

// Record executionStats.executionStats.totalDocsExamined from both outputs.
// Important: because this pipeline groups all records without a $match on ts,
// the index may not reduce documents examined. Explain results must be reported
// honestly; an index is not guaranteed to improve every aggregation.
