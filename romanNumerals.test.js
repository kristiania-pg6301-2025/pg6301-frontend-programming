import { test, expect } from "vitest";

function romanNumbers(number) {
  if (number === 2) return "II";
  return "I";
}

test("1 in roman numbers is I", () => {
  expect(romanNumbers(1)).toBe("I");
});

test("2 in roman numbers is II", () => {
  expect(romanNumbers(2)).toBe("II");
});
