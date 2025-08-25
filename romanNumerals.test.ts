import { expect, test } from "vitest";
import { romanNumbers } from "./romanNumbers.js";

function testRoman(number: number, expectedText: string) {
  test(`${number} in roman numbers is ${expectedText}`, () => {
    expect(romanNumbers(number)).toBe(expectedText);
  });
}

testRoman(444, "CDXLIV");
testRoman(555, "DLV");
testRoman(999, "CMXCIX");
testRoman(3888, "MMMDCCCLXXXVIII");
