# Street Food Festival — MongoDB Atlas Project

A three-day festival database project demonstrating MongoDB document modelling, CRUD, aggregation, indexing, JSON Schema validation, and an allergen recall.

## Requirements
- MongoDB Atlas free cluster
- Atlas Data Explorer / embedded Mongosh
- Node.js is not required for the core assignment
- `mongosh` syntax; scripts are designed to run in the Atlas shell

## Quick start
1. Create an Atlas free cluster and database user.
2. Open **Data Explorer → `festival` database → Open MongoDB Shell** (or Atlas embedded shell).
3. Run `scripts/00_setup.js` to create collections and validators.
4. Run `scripts/01_vendors.js` to insert 12 vendors.
5. Run `scripts/02_generate_orders.js` to generate 300 orders.
6. Run `scripts/03_basic_queries.js` (CRUD queries and Georgian price update; vendor deletion is separate).
7. Run `scripts/04_aggregation_pipelines.js` one pipeline at a time and capture results.
8. Run `scripts/05_index_explain.js` and record the before/after execution stats.
9. Run `scripts/07_delete_vendor_demo.js` AFTER the analytics, to demonstrate orphaned references.
10. Run `scripts/06_twist_sesame_recall.js` only after taking a screenshot of the pre-recall menu data.
11. Export collections as JSON from Atlas Data Explorer.

**Festival dates:** 20–22 June 2026 (UTC). The supplied generator creates timestamps in the 12:00–22:59 UTC range.

## Project structure
- `scripts/`: runnable MongoDB shell scripts, in execution order
- `queries/`: plain-text query reference
- `docs/`: report outline, model diagram, defence Q&A, AI-use statement
- `presentation/`: five-slide defence presentation outline

## Important notes
- The data is synthetic and generated randomly. Your exact revenue, busiest hour, dish ranking, payment percentages, and explain statistics will vary.
- Run the scripts in order on a fresh database. `00_setup.js` drops/recreates the two collections, so do not rerun it after you have valuable data unless you intend to reset the project.
- The sesame query only evaluates recorded menu ingredients/allergens. It cannot certify kitchen practices or prevent cross-contamination. Visitors with severe allergies must confirm directly with stall staff.
- For the index comparison, capture the `executionStats` output from your own Atlas cluster. Do not invent or copy example numbers.

## Three-sentence modelling explanation
The menu is embedded inside each vendor because it is a small, bounded list that is commonly read together with the vendor profile. Orders are stored separately because a vendor can accumulate many orders, and embedding an unbounded order history would make vendor documents grow continuously. Referencing each order with `vendor_id` keeps order records independently queryable and avoids duplicating vendor details in every order.

## API?
This is a database-first assignment; no HTTP API is required by the rubric. The MongoDB collections and queries are the backend. An Express API can be added later as an extension.
