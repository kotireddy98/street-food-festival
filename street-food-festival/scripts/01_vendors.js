// Run after 00_setup.js. Inserts 12 festival vendors.

db.vendors.insertOne({
  _id: "V01", name: "Pelmeņi Express", cuisine: "Latvian",
  stall: { zone: "A", number: 3 }, rating: 4.6, tags: ["traditional", "family"],
  menu: [
      { item: "Pelmeņi with sour cream", price: 6.5, vegan: false, allergens: ["gluten", "milk"], available: true },
      { item: "Rye bread pudding", price: 4.0, vegan: false, allergens: ["gluten", "milk", "egg"], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V02", name: "Riga Greens", cuisine: "Latvian",
  stall: { zone: "B", number: 2 }, rating: 4.4, tags: ["vegan", "local"],
  menu: [
      { item: "Pea patties", price: 5.5, vegan: true, allergens: ["gluten"], available: true },
      { item: "Potato salad", price: 4.5, vegan: true, allergens: [], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V03", name: "Tbilisi Table", cuisine: "Georgian",
  stall: { zone: "B", number: 5 }, rating: 4.8, tags: ["spicy", "traditional"],
  menu: [
      { item: "Khachapuri", price: 8.5, vegan: false, allergens: ["gluten", "milk", "egg"], available: true },
      { item: "Lobio", price: 6.0, vegan: true, allergens: [], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V04", name: "Khinkali House", cuisine: "Georgian",
  stall: { zone: "C", number: 1 }, rating: 4.5, tags: ["dumplings"],
  menu: [
      { item: "Beef khinkali", price: 9.0, vegan: false, allergens: ["gluten"], available: true },
      { item: "Ajapsandali", price: 6.5, vegan: true, allergens: [], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V05", name: "Tokyo Bites", cuisine: "Japanese",
  stall: { zone: "A", number: 6 }, rating: 4.7, tags: ["street-food"],
  menu: [
      { item: "Veggie sushi", price: 7.0, vegan: true, allergens: ["soy"], available: true },
      { item: "Chicken yakitori", price: 8.0, vegan: false, allergens: ["soy"], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V06", name: "Osaka Noodles", cuisine: "Japanese",
  stall: { zone: "B", number: 7 }, rating: 4.2, tags: ["noodles"],
  menu: [
      { item: "Miso ramen", price: 10.0, vegan: false, allergens: ["soy", "gluten"], available: true },
      { item: "Edamame", price: 4.0, vegan: true, allergens: ["soy"], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V07", name: "Taco Camino", cuisine: "Mexican",
  stall: { zone: "C", number: 4 }, rating: 4.3, tags: ["street-food", "spicy"],
  menu: [
      { item: "Bean tacos", price: 6.0, vegan: true, allergens: ["gluten"], available: true },
      { item: "Chicken quesadilla", price: 8.0, vegan: false, allergens: ["gluten", "milk"], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V08", name: "Oaxaca Grill", cuisine: "Mexican",
  stall: { zone: "A", number: 8 }, rating: 4.6, tags: ["grill"],
  menu: [
      { item: "Corn esquites", price: 5.0, vegan: true, allergens: [], available: true },
      { item: "Pork burrito", price: 9.0, vegan: false, allergens: ["gluten"], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V09", name: "Napoli Slice", cuisine: "Italian",
  stall: { zone: "B", number: 9 }, rating: 4.1, tags: ["pizza"],
  menu: [
      { item: "Margherita slice", price: 5.5, vegan: false, allergens: ["gluten", "milk"], available: true },
      { item: "Olive focaccia", price: 4.5, vegan: true, allergens: ["gluten"], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V10", name: "Falafel Square", cuisine: "Middle Eastern",
  stall: { zone: "C", number: 2 }, rating: 4.9, tags: ["vegan", "popular"],
  menu: [
      { item: "Falafel wrap", price: 7.0, vegan: true, allergens: ["gluten", "sesame"], available: true },
      { item: "Hummus bowl", price: 6.0, vegan: true, allergens: ["sesame"], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V11", name: "Curry Leaf", cuisine: "Indian",
  stall: { zone: "A", number: 10 }, rating: 4.4, tags: ["spicy"],
  menu: [
      { item: "Chana masala", price: 6.5, vegan: true, allergens: [], available: true },
      { item: "Paneer roll", price: 7.5, vegan: false, allergens: ["milk", "gluten"], available: true }
  ]
});

db.vendors.insertOne({
  _id: "V12", name: "Sweet Cloud", cuisine: "French",
  stall: { zone: "B", number: 11 }, rating: 4.7, tags: ["dessert"],
  menu: [
      { item: "Crepe", price: 6.0, vegan: false, allergens: ["gluten", "milk", "egg"], available: true },
      { item: "Fruit sorbet", price: 4.5, vegan: true, allergens: [], available: true }
  ]
});
print("Inserted 12 vendors.");
