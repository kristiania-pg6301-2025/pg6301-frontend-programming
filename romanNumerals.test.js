import { test, expect } from "vitest";

function romanNumbers(number) {
  let result = "";
  while (number > 0) {
    result += "I";
    number -= 1;
  }
  return result;
}

function testRoman(number, expectedText) {
  test(`${number} in roman numbers is ${expectedText}`, () => {
    expect(romanNumbers(number)).toBe(expectedText);
  });
}

testRoman(1, "I");
testRoman(2, "II");
testRoman(3, "III");
testRoman(4, "IV");
