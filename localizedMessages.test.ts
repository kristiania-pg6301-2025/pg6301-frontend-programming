import { test, expect } from "vitest";

const norwegian: ApplicationMessages = {
  generalError: "Det har skjedd en feil",
  networkError: "Fikk ikke kontakt med serveren",
};
const english: ApplicationMessages = {
  generalError: "An error has occurred",
  networkError: "No connection to server",
};

interface ApplicationMessages {
  networkError: string;
  generalError: string;
}

function localizedMessage(language: ApplicationMessages, errorCode: string) {
  if (errorCode === "generalError") return language.generalError;
  if (errorCode === "networkError") return language.networkError;
}

test("should translate general error", () => {
  expect(localizedMessage(norwegian, "generalError")).toBe(
    "Det har skjedd en feil",
  );
  expect(localizedMessage(english, "generalError")).toBe(
    "An error has occurred",
  );
});

test("should translate server error", () => {
  expect(localizedMessage(norwegian, "networkError")).toBe(
    "Fikk ikke kontakt med serveren",
  );
  expect(localizedMessage(english, "networkError")).toBe(
    "No connection to server",
  );
});
