// Sesame recall received at 19:00. Run after taking pre-recall screenshots.
// Mark every menu dish whose allergens array contains "sesame" unavailable.
db.vendors.updateMany(
  {},
  { $set: { "menu.$[dish].available": false } },
  { arrayFilters: [{ "dish.allergens": "sesame" }] }
);

// Verify affected dishes.
db.vendors.aggregate([
  { $unwind: "$menu" },
  { $match: { "menu.allergens": "sesame" } },
  { $project: { _id: 0, vendor: "$name", stall: "$stall", dish: "$menu.item", available: "$menu.available" } }
]);

// List stalls with at least one currently available menu item that has no sesame
// in the recorded allergen list. This is a database-level filter, NOT a guarantee
// against kitchen cross-contact.
db.vendors.aggregate([
  { $match: { menu: { $elemMatch: { available: { $ne: false }, allergens: { $nin: ["sesame"] } } } } },
  { $project: {
    _id: 1, name: 1, cuisine: 1, stall: 1,
    safeListedDishes: {
      $filter: {
        input: "$menu", as: "dish",
        cond: {
          $and: [
            { $ne: ["$$dish.available", false] },
            { $not: [{ $in: ["sesame", "$$dish.allergens"] }] }
          ]
        }
      }
    }
  } },
  { $project: { _id: 1, name: 1, cuisine: 1, stall: 1, safeListedDishes: 1 } },
  { $sort: { "stall.zone": 1, "stall.number": 1 } }
]);
