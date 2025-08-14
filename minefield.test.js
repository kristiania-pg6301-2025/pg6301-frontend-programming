import { test, expect } from "vitest";

function showMinefield(minefieldRows) {
  return undefined;
}

test("should return empty minefield", () => {
  expect(showMinefield(["."])).toEqual(["0"]);
});
