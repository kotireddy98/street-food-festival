// Run after 01_vendors.js. Generates 300 synthetic orders.
const vendors = db.vendors.find().toArray();
const pay = ["card", "cash", "app"];
const orderDocs = [];

if (vendors.length < 12) {
  throw new Error("Expected 12 vendors. Run scripts/01_vendors.js first.");
}

for (let i = 0; i < 300; i++) {
  const v = vendors[Math.floor(Math.random() * vendors.length)];
  const availableMenu = v.menu.filter(d => d.available !== false);
  const d = availableMenu[Math.floor(Math.random() * availableMenu.length)];
  const qty = 1 + Math.floor(Math.random() * 3);
  orderDocs.push({
    vendor_id: v._id,
    ts: new Date(Date.UTC(
      2026, 5,
      20 + Math.floor(Math.random() * 3),
      12 + Math.floor(Math.random() * 11),
      Math.floor(Math.random() * 60)
    )),
    payment: pay[Math.floor(Math.random() * pay.length)],
    items: [{ item: d.item, qty: qty, price: d.price }],
    total: qty * d.price
  });
}
db.orders.insertMany(orderDocs);
print("Inserted " + db.orders.countDocuments() + " orders.");
