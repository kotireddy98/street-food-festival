// Run AFTER all five aggregation pipelines and screenshots.
// MongoDB does not automatically cascade-delete referenced orders.
db.vendors.deleteOne({ _id: "V12" });

// Orders remain, now with an orphaned vendor_id reference.
db.orders.countDocuments({ vendor_id: "V12" });

// Optional cleanup only if you deliberately want cascade-like behaviour:
// db.orders.deleteMany({ vendor_id: "V12" });
