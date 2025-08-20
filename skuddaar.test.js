import { test, expect } from "vitest";

function isLeapYear(number) {
  return false;
}

test("2025 er ikke et skuddår", () => {
  expect(isLeapYear(2025)).toBe(false);
});
