import { test, expect } from "vitest";

const norwegian = {
  generalError: "Det har skjedd en feil",
};
const english = {
  generalError: "An error has occurred",
};

function localizedMessage(language: any, errorCode: string) {
  return language.generalError;
}

test("should translate general error", () => {
  expect(localizedMessage(norwegian, "generalError")).toBe(
    "Det har skjedd en feil",
  );
  expect(localizedMessage(english, "generalError")).toBe(
    "An error has occurred",
  );
});
