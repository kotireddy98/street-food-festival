// Run first on a fresh database named festival.
use("festival");

db.vendors.drop();
db.orders.drop();

db.createCollection("vendors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "name", "cuisine", "stall", "rating", "tags", "menu"],
      properties: {
        _id: { bsonType: "string" },
        name: { bsonType: "string", minLength: 1 },
        cuisine: { bsonType: "string", minLength: 1 },
        stall: {
          bsonType: "object",
          required: ["zone", "number"],
          properties: {
            zone: { bsonType: "string" },
            number: { bsonType: ["int", "long", "double"], minimum: 1 }
          }
        },
        rating: { bsonType: ["int", "long", "double"], minimum: 0, maximum: 5 },
        tags: { bsonType: "array", items: { bsonType: "string" } },
        menu: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["item", "price", "vegan", "allergens"],
            properties: {
              item: { bsonType: "string" },
              price: { bsonType: ["int", "long", "double"], minimum: 0 },
              vegan: { bsonType: "bool" },
              allergens: { bsonType: "array", items: { bsonType: "string" } },
              available: { bsonType: "bool" }
            }
          }
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["vendor_id", "ts", "payment", "items", "total"],
      properties: {
        vendor_id: { bsonType: "string" },
        ts: { bsonType: "date" },
        payment: { enum: ["card", "cash", "app"] },
        items: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["item", "qty", "price"],
            properties: {
              item: { bsonType: "string" },
              qty: { bsonType: ["int", "long", "double"], minimum: 1 },
              price: { bsonType: ["int", "long", "double"], minimum: 0 }
            }
          }
        },
        total: { bsonType: ["int", "long", "double"], minimum: 0 }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

print("Created festival.vendors and festival.orders with validation.");
