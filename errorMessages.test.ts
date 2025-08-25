import { expect, test } from "vitest";

const norwegian = {
  generalError: "En feil har inntruffet",
};
const english = {
  generalError: "Something went wrong",
};

interface ApplicationMessages {
  generalError: string;
}

function showMessage(language: ApplicationMessages, error: string) {
  return language["generalError"];
}

test("general error", () => {
  expect(showMessage(norwegian, "generalError")).toBe("En feil har inntruffet");
  expect(showMessage(english, "generalError")).toBe("Something went wrong");
});
