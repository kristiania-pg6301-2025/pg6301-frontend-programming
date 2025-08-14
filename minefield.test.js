import { test, expect } from "vitest";

function showMinefield(minefieldRows) {
  const result = [];
  for (let rowIndex = 0; rowIndex < minefieldRows.length; rowIndex++) {
    let row = "";
    for (
      let colIndex = 0;
      colIndex < minefieldRows[rowIndex].length;
      colIndex++
    ) {
      row += minefieldRows[rowIndex][colIndex] === "*" ? "*" : "0";
    }
    result.push(row);
  }
  return result;
}

function testMinefield(description, inputMinefield, expectedOutput) {
  test(description, () => {
    expect(showMinefield(inputMinefield)).toEqual(expectedOutput);
  });
}

testMinefield("should return empty minefield", ["."], ["0"]);
testMinefield("should show correct number of rows", [".", "."], ["0", "0"]);
testMinefield(
  "should show correct number of columns",
  ["...", "..."],
  ["000", "000"],
);
testMinefield("should display mines", ["****", "****"], ["****", "****"]);
