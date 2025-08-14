import { test, expect } from "vitest";

function showMinefield(minefieldRows) {
  const result = [];

  function hasMine(row, col) {
    if (row < 0 || minefieldRows.length <= row) return false;
    return minefieldRows[row][col] === "*";
  }

  function cellValue(row, col) {
    if (hasMine(row, col)) return "*";
    if (hasMine(row - 1, col - 1)) return 1;
    if (hasMine(row - 1, col)) return 1;
    if (hasMine(row - 1, col + 1)) return 1;
    if (hasMine(row, col - 1)) return 1;
    if (hasMine(row, col + 1)) return 1;
    if (hasMine(row + 1, col - 1)) return 1;
    if (hasMine(row + 1, col)) return 1;
    if (hasMine(row + 1, col + 1)) return 1;
    return 0;
  }

  for (let row = 0; row < minefieldRows.length; row++) {
    let outputRow = "";
    for (let col = 0; col < minefieldRows[row].length; col++) {
      outputRow += cellValue(row, col);
    }
    result.push(outputRow);
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
testMinefield("should display hint to the right", ["*."], ["*1"]);
testMinefield("should display hint to the left", [".*."], ["1*1"]);
testMinefield("should display hints below", ["*", "."], ["*", "1"]);
testMinefield("should display hints above", [".", "*", "."], ["1", "*", "1"]);
testMinefield(
  "should display hints around",
  ["...", ".*.", "..."],
  ["111", "1*1", "111"],
);
