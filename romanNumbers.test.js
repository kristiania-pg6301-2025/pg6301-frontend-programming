import { test, expect } from "vitest";

function romanNumerals(number) {
  let result = "";

  function convertDigit(digit, digitValue) {
    while (number >= digitValue) {
      result += digit;
      number -= digitValue;
    }
  }

  convertDigit("CM", 900);
  convertDigit("C", 100);
  convertDigit("XC", 90);
  convertDigit("L", 50);
  convertDigit("X", 10);
  convertDigit("IX", 9);
  convertDigit("V", 5);
  convertDigit("IV", 4);
  convertDigit("I", 1);

  return result;
}

function testRomanNumbers(number, expected) {
  test(`${number} should be ${expected}`, () => {
    expect(romanNumerals(number)).toBe(expected);
  });
}

testRomanNumbers(1, "I");
testRomanNumbers(2, "II");
testRomanNumbers(3, "III");
testRomanNumbers(6, "VI");
testRomanNumbers(18, "XVIII");
testRomanNumbers(39, "XXXIX");
testRomanNumbers(354, "CCCLIV");
testRomanNumbers(999, "CMXCIX");
