import { test, expect } from "vitest";

test("2025 is not a leap year", () => {
  expect(isLeapYear(2025)).toBe(false);
});
