import { test, expect } from "vitest";

const norwegian = {};
const english = {};

function localizedMessage(language: any, errorCode: string) {}

test("should translate general error", () => {
  expect(localizedMessage(norwegian, "generalError")).toBe(
    "Det har skjedd en feil",
  );
  expect(localizedMessage(english, "generalError")).toBe(
    "An error has occurred",
  );
});
