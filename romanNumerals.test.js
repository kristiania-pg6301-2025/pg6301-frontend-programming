import { test, expect } from "vitest";

function romanNumbers(number) {
  let result = "";

  function convertDigits(digit, value) {
    while (number >= value) {
      result += digit;
      number -= value;
    }
  }

  convertDigits("M", 1000);
  convertDigits("CM", 900);
  convertDigits("D", 500);
  convertDigits("CD", 400);
  convertDigits("C", 100);
  convertDigits("XC", 90);
  convertDigits("L", 50);
  convertDigits("XL", 40);
  convertDigits("X", 10);
  convertDigits("IX", 9);
  convertDigits("V", 5);
  convertDigits("IV", 4);
  convertDigits("I", 1);
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
testRoman(6, "VI");
testRoman(10, "X");
testRoman(11, "XI");
testRoman(38, "XXXVIII");
testRoman(444, "CDXLIV");
testRoman(555, "DLV");
testRoman(999, "CMXCIX");
testRoman(3888, "MMMDCCCLXXXVIII");
