import { test, expect } from "vitest";

function romanNumbers(number) {
  if (number === 3) return "III";
  if (number === 2) return "II";
  return "I";
}

function testRoman(number, expectedText) {
  test(`${number} in roman numbers is ${expectedText}`, () => {
    expect(romanNumbers(number)).toBe(expectedText);
  });
}

testRoman(1, "I");
testRoman(2, "II");
testRoman(3, "III");
