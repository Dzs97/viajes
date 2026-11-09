// Run with: npm test  (Node 24 strips TypeScript types; the hook lets .ts files import each other without extensions)
import { registerHooks } from "node:module";
import { test } from "node:test";
import assert from "node:assert/strict";

registerHooks({
  resolve(specifier, context, next) {
    try {
      return next(specifier, context);
    } catch (err) {
      if (specifier.startsWith(".")) return next(`${specifier}.ts`, context);
      throw err;
    }
  },
});

const { dateForDay, daysUntilTrip, countdownMessage } = await import("./dates.ts");
const { basics } = await import("../data/basics.ts");
const { emptySaved, buildItems, updateSaved, deleteSaved, migrateV1 } = await import("./useBasicsState.ts");

test("trip days map to the right dates", () => {
  assert.equal(dateForDay(1).toDateString(), "Sat May 01 2027");
  assert.equal(dateForDay(23).toDateString(), "Sun May 23 2027");
});

test("countdown covers every trip day", () => {
  assert.equal(countdownMessage(daysUntilTrip(new Date(2027, 3, 30))), "Mañana sale el viaje");
  assert.equal(countdownMessage(daysUntilTrip(new Date(2027, 4, 1))), "¡Hoy empieza el viaje!");
  assert.equal(countdownMessage(daysUntilTrip(new Date(2027, 4, 23))), "Día 23 del viaje");
  assert.equal(countdownMessage(daysUntilTrip(new Date(2027, 4, 24))), "Viaje terminado");
});

test("basics keeps local changes on top of the file list", () => {
  let saved = updateSaved(emptySaved, 0, { status: "comprado" });
  saved = deleteSaved(saved, 1);
  saved = { ...saved, added: [{ name: "Extra", category: "misc", description: "" }] };
  const items = buildItems(saved);
  assert.equal(items[0].status, "comprado");
  assert.equal(items[0].priceUSD, basics[0].priceUSD); // price still comes from the file
  assert.ok(!items.some((i) => i.name === basics[1].name));
  assert.equal(items.length, basics.length);
  saved = updateSaved(saved, items.length - 1, { status: "opcional" });
  assert.equal(buildItems(saved).at(-1).status, "opcional");
});

test("v1 storage migrates statuses only", () => {
  const old = JSON.stringify([{ ...basics[0], status: "empacado" }, { name: "Removed item", status: "comprado" }]);
  assert.deepEqual(migrateV1(old).edits, { [basics[0].name]: { status: "empacado" } });
});
