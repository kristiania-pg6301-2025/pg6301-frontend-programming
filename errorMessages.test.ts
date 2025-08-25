import { expect, test } from "vitest";

const norwegian = {};

interface ApplicationMessages {}

function showMessage(language: ApplicationMessages, error: string) {
  return "En feil har inntruffet";
}

test("general error", () => {
  expect(showMessage(norwegian, "generalError")).toBe("En feil har inntruffet");
});
