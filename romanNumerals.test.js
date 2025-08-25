import { test, expect } from "vitest";

function romanNumbers(number) {
  let result = "";

  function convertDigits(digit, value) {
    while (number >= value) {
      result += digit;
      number -= value;
    }
  }

  convertDigits("D", 500);
  convertDigits("CD", 400);
  convertDigits("L", 50);
  convertDigits("XL", 40);
  convertDigits("X", 10);

  if (number === 9) return "IX";
  if (number >= 5) {
    result += "V";
    number -= 5;
  }
  if (number >= 4) {
    result += "IV";
    number -= 4;
  }
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
testRoman(4, "IV");
testRoman(5, "V");
testRoman(6, "VI");
testRoman(9, "IX");
testRoman(10, "X");
testRoman(11, "XI");
testRoman(38, "XXXVIII");
testRoman(40, "XL");
testRoman(444, "CDXLIV");
testRoman(555, "DLV");
