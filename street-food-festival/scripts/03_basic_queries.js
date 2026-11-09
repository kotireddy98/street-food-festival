// A. All vegan dishes under EUR 7.
db.vendors.aggregate([
  { $unwind: "$menu" },
  { $match: { "menu.vegan": true, "menu.price": { $lt: 7 }, "menu.available": { $ne: false } } },
  { $project: { _id: 0, vendor: "$name", cuisine: 1, stall: 1, dish: "$menu.item", price: "$menu.price" } }
]);

// B. Vendors in zone B with rating above 4.3.
db.vendors.find(
  { "stall.zone": "B", rating: { $gt: 4.3 } },
  { name: 1, cuisine: 1, stall: 1, rating: 1, _id: 1 }
);

// C. Raise every menu price in Georgian cuisine by 10%.
db.vendors.updateMany(
  { cuisine: "Georgian" },
  [{ $set: { menu: { $map: {
    input: "$menu", as: "dish",
    in: { $mergeObjects: ["$$dish", { price: { $round: [{ $multiply: ["$$dish.price", 1.10] }, 2] }] }]
  } } } }]
);

// Verify Georgian prices.
db.vendors.find({ cuisine: "Georgian" }, { name: 1, menu: 1 });

// D. Vendor deletion is demonstrated separately in scripts/07_delete_vendor_demo.js.
// Run that AFTER the five aggregation pipelines so all vendor lookups retain their data.
