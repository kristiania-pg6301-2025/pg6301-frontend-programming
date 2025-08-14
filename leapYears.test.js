import { test, expect } from "vitest";

function isLeapYear(year) {
  if (year % 100 === 0) return false;
  return year % 4 === 0;
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
test("2100 is a not leap year", () => {
  expect(isLeapYear(2100)).toBe(false);
});
