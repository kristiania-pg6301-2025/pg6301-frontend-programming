import { test, expect } from "vitest";

function showMinefield(minefieldRows) {
  return ["0"];
}

test("should return empty minefield", () => {
  expect(showMinefield(["."])).toEqual(["0"]);
});
test("should show correct number of rows", () => {
  expect(showMinefield([".", "."])).toEqual(["0", "0"]);
});
