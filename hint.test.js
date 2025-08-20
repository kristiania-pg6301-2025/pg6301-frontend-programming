import { expect, test } from "vitest";

function hints(potentialMines) {
  const hints = [];

  function containsMine(row, column) {
    if (row >= potentialMines.length || row < 0) return false;
    return potentialMines[row][column] === "*";
  }

  function cellValue(row, column) {
    if (containsMine(row, column)) return "*";
    let mineCount = 0;
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = column - 1; c <= column + 1; c++) {
        if (containsMine(r, c)) mineCount++;
      }
    }
    return mineCount;
  }

  for (let row = 0; row < potentialMines.length; row++) {
    let rowHints = "";
    for (let column = 0; column < potentialMines[row].length; column++) {
      rowHints += cellValue(row, column);
    }
    hints.push(rowHints);
  }
  return hints;
}

test("should show empty minefield", () => {
  expect(hints([" "])).toEqual(["0"]);
});
test("should show correct number of rows", () => {
  expect(hints([" ", " "])).toEqual(["0", "0"]);
});
test("should show correct number of columns", () => {
  expect(hints(["   ", "   "])).toEqual(["000", "000"]);
});

test("should show correct number of columns", () => {
  expect(hints(["***", "***"])).toEqual(["***", "***"]);
});

test("should detect mine on the same row", () => {
  expect(hints([" * "])).toEqual(["1*1"]);
});

test("should detect mine on the same column", () => {
  expect(hints([" ", "*", " "])).toEqual(["1", "*", "1"]);
});
test("should detect mine around cell", () => {
  expect(hints(["   ", " * ", "   "])).toEqual(["111", "1*1", "111"]);
});
test("should count mine around cell", () => {
  expect(hints(["***", "* *", "***"])).toEqual(["***", "*8*", "***"]);
});
