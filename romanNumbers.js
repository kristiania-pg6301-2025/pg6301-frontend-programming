export function romanNumbers(number) {
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
