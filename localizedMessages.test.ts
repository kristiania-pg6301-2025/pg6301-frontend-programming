import { test, expect } from "vitest";

const norwegian: ApplicationMessages = {
  generalError: "Det har skjedd en feil",
  networkError: "Fikk ikke kontakt med serveren",
  invalidEmail: (emailAddress) =>
    `'${emailAddress}' er ikke en gyldig emailadresse`,
};
const english: ApplicationMessages = {
  generalError: "An error has occurred",
  networkError: "No connection to server",
  invalidEmail: (emailAddress) =>
    `'${emailAddress}' is an invalid email address`,
};

interface ApplicationMessages {
  networkError: string;
  generalError: string;

  invalidEmail(emailAddress: string): string;
}

function localizedMessage(
  language: ApplicationMessages,
  errorCode:
    | { code: "generalError" | "networkError" }
    | { code: "invalidEmail"; emailAddress: string },
) {
  if (errorCode.code === "generalError") return language.generalError;
  if (errorCode.code === "networkError") return language.networkError;
  if (errorCode.code === "invalidEmail") {
    return language.invalidEmail(errorCode.emailAddress);
  }
}

test("should translate general error", () => {
  expect(localizedMessage(norwegian, { code: "generalError" })).toBe(
    "Det har skjedd en feil",
  );
  expect(localizedMessage(english, { code: "generalError" })).toBe(
    "An error has occurred",
  );
});

test("should translate server error", () => {
  expect(localizedMessage(norwegian, { code: "networkError" })).toBe(
    "Fikk ikke kontakt med serveren",
  );
  expect(localizedMessage(english, { code: "networkError" })).toBe(
    "No connection to server",
  );
});

test("should return message with argument", () => {
  expect(
    localizedMessage(norwegian, {
      code: "invalidEmail",
      emailAddress: "johannes-at-kristiania",
    }),
  ).toBe("'johannes-at-kristiania' er ikke en gyldig emailadresse");
  expect(
    localizedMessage(english, {
      code: "invalidEmail",
      emailAddress: "johannes-at-kristiania",
    }),
  ).toBe("'johannes-at-kristiania' is an invalid email address");
});
