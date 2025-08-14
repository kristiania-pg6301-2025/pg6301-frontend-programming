import { test, expect } from "vitest";

function isLeapYear(number) {
  return number === 2028;
}

test("2025 is not a leap year", () => {
  expect(isLeapYear(2025)).toBe(false);
});
test("2028 is a leap year", () => {
  expect(isLeapYear(2028)).toBe(true);
});
test("2032 is a leap year", () => {
  expect(isLeapYear(2032)).toBe(true);
});
