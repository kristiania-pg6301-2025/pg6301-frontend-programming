import { test, expect } from "vitest";

function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

test("2025 er ikke et skuddår", () => {
  expect(isLeapYear(2025)).toBe(false);
});
test("2100 er ikke et skuddår", () => {
  expect(isLeapYear(2100)).toBe(false);
});

test("2028 er et skuddår", () => {
  expect(isLeapYear(2028)).toBe(true);
});

test("2032 er et skuddår", () => {
  expect(isLeapYear(2032)).toBe(true);
});
test("2400 er et skuddår", () => {
  expect(isLeapYear(2400)).toBe(true);
});
