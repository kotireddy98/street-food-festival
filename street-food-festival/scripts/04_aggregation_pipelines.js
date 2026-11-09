// Pipeline A — revenue per vendor, highest first.
db.orders.aggregate([
  { $group: { _id: "$vendor_id", revenue: { $sum: "$total" }, orderCount: { $sum: 1 } } },
  { $lookup: { from: "vendors", localField: "_id", foreignField: "_id", as: "vendor" } },
  { $unwind: "$vendor" },
  { $project: { _id: 0, vendorId: "$_id", vendor: "$vendor.name", cuisine: "$vendor.cuisine", revenue: { $round: ["$revenue", 2] }, orderCount: 1 } },
  { $sort: { revenue: -1 } }
]);

// Pipeline B — busiest hour of each festival day (UTC).
db.orders.aggregate([
  { $group: {
    _id: { day: { $dayOfMonth: "$ts" }, hour: { $hour: "$ts" } },
    orders: { $sum: 1 },
    revenue: { $sum: "$total" }
  } },
  { $sort: { "_id.day": 1, orders: -1, "_id.hour": 1 } },
  { $group: {
    _id: "$_id.day",
    busiestHourUTC: { $first: "$_id.hour" },
    orderCount: { $first: "$orders" },
    revenue: { $first: "$revenue" }
  } },
  { $sort: { _id: 1 } }
]);

// Pipeline C — best-selling dish per cuisine.
// Unwind order line items, lookup vendor/cuisine, total quantity per cuisine + dish,
// sort descending, then retain the first (top) dish per cuisine.
db.orders.aggregate([
  { $unwind: "$items" },
  { $lookup: { from: "vendors", localField: "vendor_id", foreignField: "_id", as: "vendor" } },
  { $unwind: "$vendor" },
  { $group: {
    _id: { cuisine: "$vendor.cuisine", dish: "$items.item" },
    unitsSold: { $sum: "$items.qty" },
    revenue: { $sum: { $multiply: ["$items.qty", "$items.price"] } }
  } },
  { $sort: { "_id.cuisine": 1, unitsSold: -1, "_id.dish": 1 } },
  { $group: {
    _id: "$_id.cuisine",
    bestSellingDish: { $first: "$_id.dish" },
    unitsSold: { $first: "$unitsSold" },
    dishRevenue: { $first: "$revenue" }
  } },
  { $sort: { _id: 1 } }
]);

// Pipeline D — payment method share in percent.
db.orders.aggregate([
  { $group: { _id: "$payment", orders: { $sum: 1 } } },
  { $group: { _id: null, methods: { $push: { method: "$_id", orders: "$orders" } }, totalOrders: { $sum: "$orders" } } },
  { $unwind: "$methods" },
  { $project: {
    _id: 0, payment: "$methods.method", orders: "$methods.orders",
    percentage: { $round: [{ $multiply: [{ $divide: ["$methods.orders", "$totalOrders"] }, 100] }, 2] }
  } },
  { $sort: { payment: 1 } }
]);

// Pipeline E — write a festival report document to a new collection.
// $out replaces the destination collection each time this pipeline runs.
db.orders.aggregate([
  { $group: {
    _id: null,
    totalOrders: { $sum: 1 },
    totalRevenue: { $sum: "$total" },
    averageOrderValue: { $avg: "$total" }
  } },
  { $project: {
    _id: "festival-summary",
    festival: "Street Food Festival",
    dates: ["2026-06-20", "2026-06-21", "2026-06-22"],
    totalOrders: 1,
    totalRevenue: { $round: ["$totalRevenue", 2] },
    averageOrderValue: { $round: ["$averageOrderValue", 2] },
    generatedAt: "$$NOW"
  } },
  { $out: "festival_report" }
]);

// View the materialized report.
db.festival_report.find();
